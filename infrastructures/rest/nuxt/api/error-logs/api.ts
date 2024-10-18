import type { AppFetchResponse } from 'ofetch'
import type { ErrorLogRequestBody } from '@/types/nuxt-api/error-log/http'

/**
 * エラーログの送信 API
 * @param {ErrorLogRequestBody} body - リクエストボディ
 * @returns {Promise<AppFetchResponse<void>>} - API レスポンス
 */
export const post = (body: ErrorLogRequestBody): Promise<AppFetchResponse<void>> => {
  const { $nuxtServerHttpClient } = useNuxtApp()

  return $nuxtServerHttpClient('/api/error-logs', {
    method: 'POST',
    body
  })
}
