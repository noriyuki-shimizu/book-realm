import z from 'zod'
import type { SafeParseReturnType } from 'zod'

/** フォーム値 */
export const FormState = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1).max(255)
})

/** フォーム値 */
export type FormState = z.infer<typeof FormState>

/** メールアドレスのバリデーション設定 */
export const FormStateEmail = FormState.pick({ email: true })

/** メールアドレスのバリデーション型 */
export type FormStateEmail = z.infer<typeof FormStateEmail>

/** パスワードのバリデーション設定 */
export const FormStatePassword = FormState.pick({ password: true })

/** パスワードのバリデーション型 */
export type FormStatePassword = z.infer<typeof FormStatePassword>

/** 登録実行時のバリデーション */
export type SubmitInvalidParam = {
  /** メールアドレス */
  email: boolean
  /** パスワード */
  password: boolean
}

/** UI State */
export type UiState = {
  /** フォームのステート */
  formState: FormState
  /** バリデーション */
  validation: {
    /** メールアドレス */
    email: SafeParseReturnType<FormStateEmail, FormStateEmail>
    /** パスワード */
    password: SafeParseReturnType<FormStatePassword, FormStatePassword>
  }
  /** 送信前のバリデーション */
  submitInvalidParam: SubmitInvalidParam
}

export type UiGetters<S = UiState> = {
  /**
   * フォームのステートを返す
   * @param {S} state - ステート
   */
  formState: (state: S) => FormState
  /**
   * メールアドレスのエラーリストを返す
   * @param {S} state - ステート
   * @returns {{ code: string; message: string }[]} メールアドレスのエラーリスト
   */
  emailErrors: (state: S) => ({ code: string; message: string })[]
  /**
   * パスワードのエラーリストを返す
   * @param {S} state - ステート
   * @returns {{ code: string; message: string }[]} パスワードのエラーリスト
   */
  passwordErrors: (state: S) => ({ code: string; message: string })[]
  /**
   * submit 時のバリデーション結果を返す
   * @param {S} state - ステート
   * @returns {boolean} バリデーション結果
   */
  submitInvalidParam: (state: S) => SubmitInvalidParam
}

export type UiActions<S = UiState> = {
  /**
   * メールアドレスをセットする
   * @param {FormValue['email']} value メールアドレス
   */
  setEmail: (this: S, value: FormState['email']) => void
  /**
   * パスワードをセットする
   * @param {FormValue['password']} value パスワード
   */
  setPassword: (this: S, value: FormState['password']) => void
  /**
   * 送信前のバリデーションをチェックする
   */
  checkPreSubmitInvalidParam: (this: S) => void
}
