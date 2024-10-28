import { generateQueryStringFromRoute, truncateString } from './utils'
import type { ApiActions, ApiGetters, ApiState } from './types'
import { MAX_LOG_PARAMETER_LENGTH } from '@/constants/common/log'
import { post as postAccessLogRequest } from '@/infrastructures/rest/nuxt/api/access-logs'
import { post as postErrorLogRequest } from '@/infrastructures/rest/nuxt/api/error-logs'
import { defineStore } from '@/store/main'

/**
 * Log における API Store 取得
 * @returns Log API Store 情報
 */
export const useCommonLogApiStore = defineStore<ApiState, ApiGetters, ApiActions>('common-api-auth-store', () => {
  return {
    state: {},
    getters: {},
    actions: {
      async postAccessLog(pageBaseUrl, route) {
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
      async postErrorLog(pageBaseUrl, route, error) {
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
      },
      resetAll() {}
    }
  }
})
