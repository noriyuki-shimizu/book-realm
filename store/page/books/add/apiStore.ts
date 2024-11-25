import type { ApiState } from './types'
import { ErrorUtil } from '#shared/utils/core'
import { StatusCode } from '@/enums/common/http/statusCode'
import { postRequest as bookBulkAnalysisPostRequest } from '@/infrastructures/rest/nuxt/api/books/bulk-analysis'
import type { UserDetailBookKey, UserDetailPostData } from '@/enums/nuxt-api/users/[id]/books'
import {
  getRequest as userDetailBookGetRequest,
  postRequest as userDetailBookPostRequest
} from '@/infrastructures/rest/nuxt/api/users/[id]/books'

/**
 * 書籍登録画面の API Store を返す
 * @returns 書籍登録画面の API Store
 */
export const useApiStore = defineStore('page-api-books-add-store', {
  state: (): ApiState => {
    return {
      bookBulkAnalysisPostResponse: null,
      userDetailBookGetResponse: null,
      userDetailBookPostResponse: null
    }
  },
  getters: {
    bookTitles(state): string[] {
      return state.userDetailBookGetResponse?.data?.map((book) => {
        return book.title
      }) ?? []
    }
  },
  actions: {
    /**
     * 本の一括解析を送信する
     * @param {FormData} data - データ
     */
    async postBookBulkAnalysis(data: FormData): Promise<void> {
      this.bookBulkAnalysisPostResponse = null

      try {
        const response = await bookBulkAnalysisPostRequest(data)
        this.bookBulkAnalysisPostResponse = {
          data: response._data ?? null,
          status: response.status,
          error: null
        }
      } catch (err) {
        const nuxtErr = ErrorUtil.convertNuxtError(err)
        this.bookBulkAnalysisPostResponse = {
          data: null,
          status: nuxtErr.statusCode
            ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
          error: nuxtErr
        }
      }
    },
    resetBookBulkAnalysisPostResponse(): void {
      this.bookBulkAnalysisPostResponse = null
    },
    async getBookAll(userId: string, keys: UserDetailBookKey[]): Promise<void> {
      try {
        const response = await userDetailBookGetRequest({ userId }, { keys })
        this.userDetailBookGetResponse = {
          data: response._data ?? null,
          status: response.status,
          error: null
        }
      } catch (err) {
        const nuxtErr = ErrorUtil.convertNuxtError(err)
        this.userDetailBookGetResponse = {
          data: null,
          status: nuxtErr.statusCode
            ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
          error: nuxtErr
        }
      }
    },
    /**
     * 本の一括保存を送信する
     * @param {string} userId - ユーザー ID
     * @param {UserDetailPostData[]} data - データ
     */
    async postBookSaveAll(userId: string, data: UserDetailPostData[]): Promise<void> {
      try {
        const response = await userDetailBookPostRequest({ userId }, data)
        this.userDetailBookPostResponse = {
          data: null,
          status: response.status,
          error: null
        }
      } catch (err) {
        const nuxtErr = ErrorUtil.convertNuxtError(err)
        this.userDetailBookPostResponse = {
          data: null,
          status: nuxtErr.statusCode
            ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
          error: nuxtErr
        }
      }
    }
  }
})

export default useApiStore
