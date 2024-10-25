import z from 'zod'
import type { UserCredential } from 'firebase/auth'
import type { SafeParseReturnType } from 'zod'
import type { ApiResponseState } from '@/types/store/response'

/** フォーム値 */
export const FormValue = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1).max(255)
})

/** フォーム値 */
export type FormValue = z.infer<typeof FormValue>

/** フォームのステート */
export type FormState = {
  /** バリデーション値 */
  validation: {
    email: SafeParseReturnType<Pick<FormValue, 'email'>, Pick<FormValue, 'email'>> | null
    password: SafeParseReturnType<Pick<FormValue, 'password'>, Pick<FormValue, 'password'>> | null
  }
  /** フォーム値 */
  data: FormValue
}

/** UI State */
export type UiState = {
  /** フォームのステート */
  formState: FormState
}

/** API State */
export type ApiState = {
  /** メールアドレス・パスワードログインレスポンス */
  signInResponse: ApiResponseState<UserCredential> | null
  /** Google ログインレスポンス */
  signInGoogleResponse: ApiResponseState<UserCredential> | null
}
