import type { SafeParseReturnType } from 'zod'
import type { FormStateAuthor, FormStatePrice, FormStatePublishedDate, FormStatePublisher, FormStateTitle } from './enums'
import type { UserDetailBookKey, UserDetailPostData } from '@/enums/nuxt-api/users/[id]/books'
import type { BookBulkAnalysisPostResponse } from '@/types/nuxt-api/books/bulk-analysis'
import type { ApiResponseState } from '@/types/store/response'
import type { UserDetailBookData } from '@/types/nuxt-api/users/[id]/books'

/** API State */
export type ApiState = {
  /** 本の一括解析結果レスポンス */
  bookBulkAnalysisPostResponse:
    | ApiResponseState<BookBulkAnalysisPostResponse>
    | null
  /** 書籍の一覧取得レスポンス */
  userDetailBookGetResponse: ApiResponseState<UserDetailBookData[]> | null
  /** 書籍の一括登録レスポンス */
  userDetailBookPostResponse: ApiResponseState<void> | null
}

/** フォームのバリデーション */
export type FormValidation = {
  /** 本のタイトル */
  [UserDetailBookKey.title]: SafeParseReturnType<FormStateTitle, FormStateTitle> | null
  /** 本の著者 */
  [UserDetailBookKey.author]: SafeParseReturnType<FormStateAuthor, FormStateAuthor> | null
  /** 本の価格 */
  [UserDetailBookKey.price]: SafeParseReturnType<FormStatePrice, FormStatePrice> | null
  /** 本の出版社 */
  [UserDetailBookKey.publisher]: SafeParseReturnType<FormStatePublisher, FormStatePublisher> | null
  /** 本の出版年月日 */
  [UserDetailBookKey.publishedDate]: SafeParseReturnType<FormStatePublishedDate, FormStatePublishedDate> | null
}

/** フォームのデータ */
export type FormData = {
  /** フォームのステート */
  state: UserDetailPostData
  /** フォームのバリデーション */
  validation: FormValidation
}

/** UI State */
export type UiState = {
  /** ファイル配列 */
  files: File[] | null
  /** フォームのデータ */
  formData: FormData[]
}
