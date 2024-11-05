import z from 'zod'
import type { SafeParseReturnType } from 'zod'
import { PASSWORD_POLICY_REGEX } from '@/constants/common/regex'

/** アカウント登録のバリデーション設定 */
export const FormState = z.object({
  email: z.string().min(1).email(),
  password: z
    .string()
    .min(6)
    .max(255)
    .regex(PASSWORD_POLICY_REGEX.requiresUppercase, { message: 'uppercase' })
    .regex(PASSWORD_POLICY_REGEX.requiresLowercase, { message: 'lowercase' })
    .regex(PASSWORD_POLICY_REGEX.requiresSpecialCharacter, { message: 'specialCharacter' })
    .regex(PASSWORD_POLICY_REGEX.requiresDigit, { message: 'digit' }),
  confirmPassword: z
    .string()
    .min(6)
    .max(255)
    .regex(PASSWORD_POLICY_REGEX.requiresUppercase, { message: 'uppercase' })
    .regex(PASSWORD_POLICY_REGEX.requiresLowercase, { message: 'lowercase' })
    .regex(PASSWORD_POLICY_REGEX.requiresSpecialCharacter, { message: 'specialCharacter' })
    .regex(PASSWORD_POLICY_REGEX.requiresDigit, { message: 'digit' })
})

/** アカウント登録のバリデーション型 */
export type FormState = z.infer<typeof FormState>

/** メールアドレスのバリデーション設定 */
export const FormStateEmail = FormState.pick({ email: true })

/** メールアドレスのバリデーション型 */
export type FormStateEmail = z.infer<typeof FormStateEmail>

/** パスワードのバリデーション設定 */
export const FormStatePassword = FormState.pick({ password: true })

/** パスワードのバリデーション型 */
export type FormStatePassword = z.infer<typeof FormStatePassword>

/** 確認用パスワードのバリデーション設定 */
export const FormStateConfirmPassword = FormState.pick({ confirmPassword: true })

/** 確認用パスワードのバリデーション型 */
export type FormStateConfirmPassword = z.infer<typeof FormStateConfirmPassword>

/** 登録実行時のバリデーション */
export type SubmitInvalidParam = {
  /** メールアドレス */
  email: boolean
  /** パスワード */
  password: boolean
  /** 確認用パスワード */
  confirmPassword: boolean
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
    /** 確認用パスワード */
    confirmPassword: SafeParseReturnType<FormStateConfirmPassword, FormStateConfirmPassword>
  }
  /** 送信前のバリデーション */
  submitInvalidParam: SubmitInvalidParam
}

export type UiGetters<S = UiState> = {
  /**
   * フォームのステートを返す
   * @param {S} state - ステート
   * @returns {FormState} フォームのステート
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
   * 確認用パスワードのエラーリストを返す
   * @param {S} state - ステート
   * @returns {{ code: string; message: string }[]} 確認用パスワードのエラーリスト
   */
  confirmPasswordErrors: (state: S) => ({ code: string; message: string })[]
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
   * @param {FormState['email']} value メールアドレス
   */
  setEmail: (this: S, value: FormState['email']) => void
  /**
   * パスワードをセットする
   * @param {FormState['password']} value パスワード
   */
  setPassword: (this: S, value: FormState['password']) => void
  /**
   * 確認用パスワードをセットする
   * @param {FormState['confirmPassword']} value 確認用パスワード
   */
  setConfirmPassword: (this: S, value: FormState['confirmPassword']) => void
  /**
   * 送信前のバリデーションをチェックする
   */
  checkPreSubmitInvalidParam: (this: S) => void
}
