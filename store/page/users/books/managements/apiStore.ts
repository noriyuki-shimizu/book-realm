import type { ApiState } from './types'
import { ErrorUtil } from '#shared/utils/core'
import { StatusCode } from '@/enums/common/http/statusCode'
import type { UserDetailBookKey } from '@/enums/nuxt-api/users/[id]/books'
import {
  deleteRequest as userDetailBookDeleteRequest,
  getRequest as userDetailBookGetRequest
} from '@/infrastructures/rest/nuxt/api/users/[id]/books'

/**
 * 書籍登録画面の API Store を返す
 * @returns 書籍登録画面の API Store
 */
export const useApiStore = defineStore('page-api-books-managements-store', {
  state: (): ApiState => {
    return {
      userDetailBookGetResponse: null,
      userDetailBookDeleteResponse: null
    }
  },
  getters: {},
  actions: {
    /**
     * ユーザーの書籍情報を取得する
     * @param {string} userId ユーザー ID
     * @param {UserDetailBookKey[]} keys 取得する書籍情報のキー
     */
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
     * 書籍を一括登録する
     * @param {string} userId ユーザー ID
     * @param {number} bookId 書籍 ID
     */
    async deleteBookAll(userId: string, bookId: number): Promise<void> {
      try {
        const response = await userDetailBookDeleteRequest({ userId }, { id: bookId })
        this.userDetailBookDeleteResponse = {
          data: null,
          status: response.status,
          error: null
        }
      } catch (err) {
        const nuxtErr = ErrorUtil.convertNuxtError(err)
        this.userDetailBookDeleteResponse = {
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
