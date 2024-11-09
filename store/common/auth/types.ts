import type { ApiResponseState } from '@/types/store/response'

/** API State */
export type ApiState = {
  /** メールアドレス・パスワードログインレスポンス */
  signInResponse: ApiResponseState<void> | null
  /** メールアドレス・パスワードにおけるアカウント登録レスポンス */
  signUpResponse: ApiResponseState<void> | null
  /** Google ログインレスポンス */
  signInGoogleResponse: ApiResponseState<void> | null
}
