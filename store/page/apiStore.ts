import type { ApiActions, ApiGetters, ApiState } from './types'
import { postRequest } from '@/infrastructures/rest/nuxt/api/books/bulk-analysis'
import { StatusCode } from '@/enums/common/http/statusCode'
import { defineStore } from '@/store/main'

/**
 * トップページの API Store を返す
 * @returns トップページの API Store
 */
export const useApiStore = defineStore<ApiState, ApiGetters, ApiActions>('page-api-top-store', () => {
  return {
    state: {
      bookBulkAnalysisPostResponse: null
    },
    getters: {
      bookBulkAnalysisPostResponse(state) {
        return state.bookBulkAnalysisPostResponse
      }
    },
    actions: {
      async postBookBulkAnalysis(data: FormData) {
        this.bookBulkAnalysisPostResponse = null

        try {
          const response = await postRequest(data)
          this.bookBulkAnalysisPostResponse = {
            data: response._data ?? null,
            status: response.status,
            error: null
          }
        } catch (err) {
          const nuxtErr = ErrorUtil.convertNuxtError(err)
          this.bookBulkAnalysisPostResponse = {
            data: null,
            status: nuxtErr.statusCode ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
            error: nuxtErr
          }
        }
      },
      resetAll() {}
    }
  }
})
