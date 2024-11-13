import type { SafeParseReturnType } from 'zod'
import type { FormKey, FormState, FormStateEmail, FormStatePassword } from './enums'

/** フォームのバリデーション */
export type FormValidation = {
  /** メールアドレス */
  [FormKey.email]: SafeParseReturnType<FormStateEmail, FormStateEmail> | null
  /** パスワード */
  [FormKey.password]:
    | SafeParseReturnType<FormStatePassword, FormStatePassword>
    | null
}

/** UI State */
export type UiState = {
  /** フォームのステート */
  formState: FormState
  /** フォームのバリデーション */
  validation: FormValidation
  /** 登録の際のバリデーション値 */
  submitValidation: Record<FormKey, boolean>
}
