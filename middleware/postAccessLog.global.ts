import type { RouteLocationNormalized } from '#vue-router'
import { useCommonLogApiStore } from '@/store/common/log'

/**
 * アクセスログを記録する
 * @param {RouteLocationNormalized} to - 現在のルート情報
 */
const recordNuxtApiAccessLog = (to: RouteLocationNormalized): void => {
  const runtimeConfig = useRuntimeConfig()
  const { isProduction, pageBaseUrl } = runtimeConfig.public

  if (isProduction) {
    const { actions } = useCommonLogApiStore()

    actions.postAccessLog(pageBaseUrl, to)
  }
}

/**
 * アクセスログ保存処理
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const { isHydrating } = useNuxtApp()

  if (isHydrating) {
    return
  }

  recordNuxtApiAccessLog(to)
})
