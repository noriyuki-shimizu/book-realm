import type { AppFetchResponse } from 'ofetch'
import type { UserDetailBookPostRequestBody, UserDetailBookRequestParam, UserDetailBookRequestQuery } from './types'
import type { UserDetailBookData } from '@/types/nuxt-api/users/[id]/books'

export const getRequest = async (
  param: UserDetailBookRequestParam,
  query: UserDetailBookRequestQuery
): Promise<AppFetchResponse<UserDetailBookData[]>> => {
  const { $nuxtServerHttpClient } = useNuxtApp()

  return $nuxtServerHttpClient<UserDetailBookData[]>(
    `/api/users/${param.userId}/books`,
    { query }
  )
}

/**
 * 書籍一括登録の POST リクエスト
 * @param {UserDetailBookRequestParam} param リクエストパスパラメータ
 * @param {UserDetailBookPostRequestBody} body リクエストボディ
 * @returns {Promise<AppFetchResponse<void>>} 書籍一括登録レスポンス
 */
export const postRequest = async (
  param: UserDetailBookRequestParam,
  body: UserDetailBookPostRequestBody
): Promise<AppFetchResponse<void>> => {
  const { $nuxtServerHttpClient } = useNuxtApp()

  return $nuxtServerHttpClient(
    `/api/users/${param.userId}/books`,
    { method: 'POST', body }
  )
}
