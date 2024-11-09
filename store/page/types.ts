import type { BookBulkAnalysisPostResponse } from '@/types/nuxt-api/books/bulk-analysis'
import type { ApiResponseState } from '@/types/store/response'

/** API State */
export type ApiState = {
  /** 本の一括解析結果レスポンス */
  bookBulkAnalysisPostResponse: ApiResponseState<BookBulkAnalysisPostResponse> | null
}

/** UI State */
export type UiState = {
  /** ファイル配列 */
  files: File[] | null
}
