import type { SafeParseReturnType } from 'zod'
import type { FormKey, FormState, FormStateConfirmPassword, FormStateEmail, FormStatePassword } from './enums'

/** フォームのバリデーション */
export type FormValidation = {
  /** メールアドレス */
  [FormKey.email]: SafeParseReturnType<FormStateEmail, FormStateEmail> | null
  /** パスワード */
  [FormKey.password]:
    | SafeParseReturnType<FormStatePassword, FormStatePassword>
    | null
  /** 確認用パスワード */
  [FormKey.confirmPassword]:
    | SafeParseReturnType<FormStateConfirmPassword, FormStateConfirmPassword>
    | null
}

/** 登録の際のバリデーション値 */
export type SubmitValidation = Record<FormKey, boolean>

/** UI State */
export type UiState = {
  /** フォームのステート */
  formState: FormState
  /** バリデーション */
  validation: FormValidation
  /** 登録の際のバリデーション値 */
  submitValidation: SubmitValidation
}
