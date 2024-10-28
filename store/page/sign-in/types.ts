import z from 'zod'
import type { SafeParseReturnType } from 'zod'

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
  validation: SafeParseReturnType<FormValue, FormValue> | null
  /** フォーム値 */
  data: FormValue
}

export type UiGetters<S = UiState> = {
  /**
   * フォームのステートを返す
   * @param {S} state - ステート
   */
  formState: (state: S) => FormState
  /**
   * メールアドレスのエラーコードを返す
   * @param {S} state - ステート
   */
  emailErrorCodes: (state: S) => string[]
  /**
   * パスワードのエラーコードを返す
   * @param {S} state - ステート
   */
  passwordErrorCodes: (state: S) => string[]
}

export type UiActions<S = UiState> = {
  /**
   * メールアドレスをセットする
   * @param {FormValue['email']} value メールアドレス
   */
  setEmail: (this: S, value: FormValue['email']) => void
  /**
   * パスワードをセットする
   * @param {FormValue['password']} value パスワード
   */
  setPassword: (this: S, value: FormValue['password']) => void
  /**
   * フォームのバリデーションをチェックする
   */
  checkForm: (this: S) => void
}

/** UI State */
export type UiState = {
  /** フォームのステート */
  formState: FormState
}
