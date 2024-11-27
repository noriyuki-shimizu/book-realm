import type { ApiState } from './types'
import { ErrorUtil } from '#shared/utils/core'
import { StatusCode } from '@/enums/common/http/statusCode'
import type { UserDetailBookKey } from '@/enums/nuxt-api/users/[id]/books'
import { getRequest as userDetailBookGetRequest } from '@/infrastructures/rest/nuxt/api/users/[id]/books'

/**
 * 書籍登録画面の API Store を返す
 * @returns 書籍登録画面の API Store
 */
export const useApiStore = defineStore('page-api-books-managements-store', {
  state: (): ApiState => {
    return {
      userDetailBookGetResponse: null
    }
  },
  getters: {},
  actions: {
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
    }
  }
})

export default useApiStore
