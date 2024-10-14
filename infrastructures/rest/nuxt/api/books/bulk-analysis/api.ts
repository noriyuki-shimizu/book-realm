import type { AppFetchResponse } from 'ofetch'
import type { BookBulkAnalysisPostRequestBody } from './types'
import type { BookBulkAnalysisPostResponse } from '@/types/nuxt-api/books/bulk-analysis'

/**
 * 本の一括解析結果の POST リクエスト
 * @param {BookBulkAnalysisPostRequestBody} body リクエストボディ
 * @returns {Promise<AppFetchResponse<BookBulkAnalysisPostResponse>>} 本の一括解析結果レスポンス
 */
export const postRequest = async (
  body: BookBulkAnalysisPostRequestBody
): Promise<AppFetchResponse<BookBulkAnalysisPostResponse>> => {
  const { $nuxtServerHttpClient } = useNuxtApp()

  return $nuxtServerHttpClient<BookBulkAnalysisPostResponse>('/api/books/bulk-analysis', {
    method: 'POST',
    body
  })
}
