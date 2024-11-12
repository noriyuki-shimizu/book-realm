import { useCommonLogApiStore } from '@/store/common/log'

/**
 * アクセスログ保存処理
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const { isHydrating } = useNuxtApp()

  if (isHydrating) {
    return
  }

  const runtimeConfig = useRuntimeConfig()
  const { isProduction, pageBaseUrl } = runtimeConfig.public

  if (isProduction) {
    const commonLogApiStore = useCommonLogApiStore()

    commonLogApiStore.postAccessLog(pageBaseUrl, to)
  }
})
