import type { ApiResponseState } from '@/types/store/response'
import type { UserDetailBookData } from '@/types/nuxt-api/users/[id]/books'

/** API State */
export type ApiState = {
  /** 書籍の一覧取得レスポンス */
  userDetailBookGetResponse: ApiResponseState<UserDetailBookData[]> | null
  /** 書籍の削除レスポンス */
  userDetailBookDeleteResponse: ApiResponseState<void> | null
}
