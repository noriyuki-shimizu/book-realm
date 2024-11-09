import type { ApiState } from './types'
import { postRequest } from '@/infrastructures/rest/nuxt/api/books/bulk-analysis'
import { StatusCode } from '@/enums/common/http/statusCode'

/**
 * トップページの API Store を返す
 * @returns トップページの API Store
 */
export const useApiStore = defineStore('page-api-top-store', {
  state: (): ApiState => {
    return {
      bookBulkAnalysisPostResponse: null
    }
  },
  getters: {},
  actions: {
    /**
     * 本の一括解析を送信する
     * @param {FormData} data - データ
     */
    async postBookBulkAnalysis(data: FormData): Promise<void> {
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
    }
  }
})
