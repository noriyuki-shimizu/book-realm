import type { UserCredential } from 'firebase/auth'
import type { ApiResponseState } from '@/types/store/response'

/** API State */
export type ApiState = {
  userCredential: UserCredential | null
  /** メールアドレス・パスワードログインレスポンス */
  signInResponse: ApiResponseState<void> | null
  /** Google ログインレスポンス */
  signInGoogleResponse: ApiResponseState<void> | null
}
