import type { NuxtError } from '#app'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { generateQueryStringFromRoute, truncateString } from './utils'
import { MAX_LOG_PARAMETER_LENGTH } from '@/constants/common/log'
import { post as postAccessLogRequest } from '@/infrastructures/rest/nuxt/api/access-logs'
import { post as postErrorLogRequest } from '@/infrastructures/rest/nuxt/api/error-logs'

/**
 * Log における API Store 取得
 * @returns Log API Store 情報
 */
export const useCommonLogApiStore = () => {
  /** Runtime Config */
  const config = useRuntimeConfig()
  /** クエリ文字列を取得 */
  const getQueryString = generateQueryStringFromRoute(config.public.pageBaseUrl)

  /** Actions */
  const actions = {
    /**
     * アクセスログ保存処理
     * @param {RouteLocationNormalizedLoaded} route - 画面情報
     */
    async postAccessLog(route: RouteLocationNormalizedLoaded): Promise<void> {
      const urlQuery = getQueryString(route)

      await postAccessLogRequest({
        level: 'INFO',
        method: 'GET',
        path: route.path,
        query: truncateString(urlQuery, MAX_LOG_PARAMETER_LENGTH),
        context: {
          userId: null,
          renderingMode: import.meta.server ? 'ssr' : 'csr'
        },
        status: '200'
      })
    },
    /**
     * アクセスログ保存処理
     * @param {RouteLocationNormalizedLoaded} route - 画面情報
     * @param {NuxtError} error - エラー情報
     */
    async postErrorLog(route: RouteLocationNormalizedLoaded, error: Partial<NuxtError>): Promise<void> {
      const urlQuery = getQueryString(route)

      await postErrorLogRequest({
        level: 'ERROR',
        method: 'GET',
        path: route.path,
        query: truncateString(urlQuery, MAX_LOG_PARAMETER_LENGTH),
        context: {
          userId: null,
          renderingMode: import.meta.server ? 'ssr' : 'csr'
        },
        status: error.statusCode?.toString() || '',
        message: error.message || '',
        stackTrace: truncateString(error.stack || '', MAX_LOG_PARAMETER_LENGTH)
      })
    }
  }

  return {
    ...actions
  } as const
}
