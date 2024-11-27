import type { User } from 'firebase/auth'
import { ErrorUtil } from '#shared/utils/core'
import { useCommonLogApiStore } from '@/store/common/log'

/**
 * エラーハンドリング
 * @see {@link https://nuxt.com/docs/getting-started/error-handling}
 */
export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute()
  const commonLogApiStore = useCommonLogApiStore()
  const runtimeConfig = useRuntimeConfig()
  const { isProduction, pageBaseUrl } = runtimeConfig.public

  // トップレベルまでの Vue エラーの伝播を検知 (onErrorCapturedライフサイクルフックに基づいている)
  nuxtApp.hook('vue:error', async (error, instance) => {
    if (isProduction) {
      const nuxtError = ErrorUtil.convertNuxtError(error)
      const user: User | null = await getCurrentUser()
      commonLogApiStore.postErrorLog(
        pageBaseUrl,
        instance?.$route ?? route,
        user,
        nuxtError
      )
    }
  })

  // すべての処理済み Vue エラーを検知。
  // nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {}

  // Nuxtアプリケーションの起動時におけるエラーを検知
  nuxtApp.hook('app:error', async (error) => {
    if (isProduction) {
      const nuxtError = ErrorUtil.convertNuxtError(error)
      const user: User | null = await getCurrentUser()
      commonLogApiStore.postErrorLog(pageBaseUrl, route, user, nuxtError)
    }
  })
})
