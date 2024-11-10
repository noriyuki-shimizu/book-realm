import type { RouterConfig } from '@nuxt/schema'
import type { RouteLocationNormalized, RouterScrollBehavior } from 'vue-router'
import { isChangingPage } from '#app/components/utils'
import { appPageTransition as defaultPageTransition } from '#build/nuxt.config.mjs'

type ScrollPosition = Awaited<ReturnType<RouterScrollBehavior>>

/**
 * ルート遷移時の初期スクロール位置を決定する
 *
 * @param args - vue-routerのscrollBehavior関数と同じパラメータ
 * @returns 初期スクロール位置
 *
 * @description
 * この関数は、ルート遷移時の初期スクロール位置を決定します。以下の順序で位置を決定します：
 * 1. `savedPosition`が存在する場合（ブラウザの戻るボタンを使用した場合）、それを使用
 * 2. 新しいルートが`scrollToTop`を許可し、ページが変更される場合、ページ上部にスクロール
 * 3. 上記以外の場合、現在のスクロール位置を維持
 *
 * @remarks
 * - `to.meta.scrollToTop`が関数の場合、その関数の結果を使用してスクロールするかどうかを決定
 * - 返される位置が偽値または空オブジェクトの場合、vue-routerは現在のスクロール位置を維持
 */
function _getInitPosition(...args: Parameters<NonNullable<RouterConfig['scrollBehavior']>>): ScrollPosition {
  const [to, from, savedPosition] = args
  // By default when the returned position is falsy or an empty object, vue-router will retain the current scroll position
  // savedPosition is only available for popstate navigations (back button)
  const position: ScrollPosition = savedPosition || undefined

  const routeAllowsScrollToTop = typeof to.meta.scrollToTop === 'function'
    ? to.meta.scrollToTop(to, from)
    : to.meta.scrollToTop

  // Scroll to top if route is changed by default
  if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
    return { left: 0, top: 0 }
  }

  return position
}

/**
 * ハッシュ要素のスクロールマージントップを計算する
 *
 * @param selector - ターゲット要素のCSSセレクター
 * @returns 計算されたスクロールマージントップの値（ピクセル単位）
 *
 * @description
 * この関数は、指定されたセレクターに一致する要素の`scrollMarginTop`と
 * ドキュメントルート要素の`scrollPaddingTop`の合計を計算します。
 * これは、ハッシュリンクでスクロールする際の正確な位置決めに使用されます。
 *
 * @throws
 * セレクターに一致する要素が見つからない場合や、
 * スタイルの解析中にエラーが発生した場合は、0を返します。
 */
function _getHashElementScrollMarginTop(selector: string): number {
  try {
    const elem = document.querySelector(selector)
    if (elem) {
      return (
        Number.parseFloat(getComputedStyle(elem).scrollMarginTop)
        + Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)
      )
    }
  } catch {
    // ignore any errors parsing scrollMarginTop
  }
  return 0
}

/**
 * 画面遷移時におけるスクロールポジションのカスタマイズ
 * @see {@link https://router.vuejs.org/guide/advanced/scroll-behavior.html}
 *
 * @description
 * スクロールポジションのカスタマイズは、nuxt 側で実施されており、その機能を担保（※）しつつ client_front に適応したカスタム処理を追加
 * ※ hash周りのソースコードは全て削除したため、hashを使う場合は実装する
 *
 * - 該当ファイル(Git link) - [git]({@link https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/router.options.ts})
 * - 該当ファイル(node_modules) - node_modules/nuxt/dist/pages/runtime/router.options.js
 *
 * @remark
 * 注意点としては、nuxt フレームワークの機能を担保するため、nuxt パッケージの変更は都度確認する必要がある
 */
export default <RouterConfig> {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()
    // @ts-expect-error untyped, nuxt-injected option
    const behavior = useRouter().options?.scrollBehaviorType ?? 'auto'

    const position = _getInitPosition(to, from, savedPosition)

    // Hash routes on the same page, no page hook is fired so resolve here
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 }
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior }
      }
      // The route isn't changing so keep current scroll position
      return false
    }

    // Wait for `page:transition:finish` or `page:finish` depending on if transitions are enabled or not
    const hasTransition = (route: RouteLocationNormalized) => !!(route.meta.pageTransition ?? defaultPageTransition)
    const hookToWait = hasTransition(from) && hasTransition(to) ? 'page:transition:finish' : 'page:finish'
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve) => setTimeout(resolve, 0))
        if (to.hash) {
          resolve({ el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior })
          return
        }
        resolve(position)
      })
    })
  }
}
