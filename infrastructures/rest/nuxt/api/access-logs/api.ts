import type { AppFetchResponse } from 'ofetch'
import type { AccessLogRequestBody } from '@/types/nuxt-api/access-log/http'

/**
 * アクセスログの送信 API
 * @param {AccessLogRequestBody} body - リクエストボディ
 * @returns {Promise<AppFetchResponse<void>>} - API レスポンス
 */
export const post = (body: AccessLogRequestBody): Promise<AppFetchResponse<void>> => {
  const { $nuxtServerHttpClient } = useNuxtApp()

  return $nuxtServerHttpClient('/api/access-logs', {
    method: 'POST',
    body
  })
}
