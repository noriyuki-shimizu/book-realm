import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { NuxtError } from '#app'
import { generateQueryStringFromRoute, truncateString } from './utils'
import type { ApiState } from './types'
import { MAX_LOG_PARAMETER_LENGTH } from '@/constants/common/log'
import { post as postAccessLogRequest } from '@/infrastructures/rest/nuxt/api/access-logs'
import { post as postErrorLogRequest } from '@/infrastructures/rest/nuxt/api/error-logs'

/**
 * Log における API Store 取得
 * @returns Log API Store 情報
 */
export const useCommonLogApiStore = defineStore('common-api-log-store', {
  state: (): ApiState => {
    return {}
  },
  getters: {},
  actions: {
    /**
     * アクセスログを送信する
     * @param {string} pageBaseUrl アプリケーションのベース URL
     * @param {RouteLocationNormalizedLoaded} route ルート
     */
    async postAccessLog(pageBaseUrl: string, route: RouteLocationNormalizedLoaded): Promise<void> {
      const getQueryString = generateQueryStringFromRoute(pageBaseUrl)
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
     * エラーログを送信する
     * @param {string} pageBaseUrl アプリケーションのベース URL
     * @param {RouteLocationNormalizedLoaded} route ルート
     * @param {Partial<NuxtError>} error エラー
     */
    async postErrorLog(
      pageBaseUrl: string,
      route: RouteLocationNormalizedLoaded,
      error: Partial<NuxtError>
    ): Promise<void> {
      const getQueryString = generateQueryStringFromRoute(pageBaseUrl)
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
})
