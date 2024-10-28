import type { BookBulkAnalysisPostResponse } from '@/types/nuxt-api/books/bulk-analysis'
import type { ApiResponseState } from '@/types/store/response'

export type ApiGetters<S = ApiState> = {
  /**
   * 本の一括解析結果レスポンス
   * @param {S} state - ステート
   * @returns {ApiResponseState<BookBulkAnalysisPostResponse> | null} 本の一括解析結果レスポンス
   */
  bookBulkAnalysisPostResponse(state: S): ApiResponseState<BookBulkAnalysisPostResponse> | null
}

export type ApiActions<S = ApiState> = {
  /**
   * 本の一括解析を実行
   * @param {FormData} data フォームデータ (ファイルデータ)
   */
  postBookBulkAnalysis(this: S, data: FormData): Promise<void>
}

/** API State */
export type ApiState = {
  /** 本の一括解析結果レスポンス */
  bookBulkAnalysisPostResponse: ApiResponseState<BookBulkAnalysisPostResponse> | null
}

export type UiGetters<S = UiState> = {
  /**
   * ファイル配列
   * @param {S} state - ステート
   * @returns {File[] | null} ファイル配列
   */
  files(state: S): File[] | null
}

export type UiActions<S = UiState> = {
  /**
   * ファイルを設定
   * @param {files: File[] | null} files ファイル配列
   */
  setFiles(this: S, files: File[] | null): Promise<void>
}

/** UI State */
export type UiState = {
  /** ファイル配列 */
  files: File[] | null
}
