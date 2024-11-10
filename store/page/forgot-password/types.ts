import type { SafeParseReturnType } from 'zod'
import type {
  EmailFormKey,
  EmailFormState,
  FormStateConfirmPassword,
  FormStateEmail,
  FormStatePassword,
  PasswordFormKey,
  PasswordFormState
} from './enums'

/** メールフォームのバリデーション */
export type EmailFormValidation = {
  /** メールアドレス */
  [EmailFormKey.email]: SafeParseReturnType<FormStateEmail, FormStateEmail> | null
}

/** メールフォームのバリデーション */
export type PasswordFormValidation = {
  /** パスワード */
  [PasswordFormKey.password]: SafeParseReturnType<FormStatePassword, FormStatePassword> | null
  /** 確認用パスワード */
  [PasswordFormKey.confirmPassword]: SafeParseReturnType<FormStateConfirmPassword, FormStateConfirmPassword> | null
}

/** UI State */
export type UiState = {
  /** メールフォームのステート */
  emailFormState: EmailFormState
  /** メールフォームのバリデーション */
  emailValidation: EmailFormValidation
  /** メール登録の際のバリデーション値 */
  emailSubmitValidation: Record<EmailFormKey, boolean>
  /** パスワードフォームのステート */
  passwordFormState: PasswordFormState
  /** パスワードフォームのバリデーション */
  passwordValidation: PasswordFormValidation
  /** パスワード登録の際のバリデーション値 */
  passwordSubmitValidation: Record<PasswordFormKey, boolean>
}
