import z from 'zod'
import { PASSWORD_POLICY_REGEX } from '@/constants/common/regex'

/** メールフォームのキー */
export const EmailFormKey = {
  email: 'email'
} as const

/** メールフォームのキー型 */
export type EmailFormKey = typeof EmailFormKey[keyof typeof EmailFormKey]

/** パスワードフォームのキー */
export const PasswordFormKey = {
  password: 'password',
  confirmPassword: 'confirmPassword'
} as const

/** パスワードフォームのキー型 */
export type PasswordFormKey = typeof PasswordFormKey[keyof typeof PasswordFormKey]

/** アカウント登録のバリデーション設定 */
export const EmailFormState = z.object({
  [EmailFormKey.email]: z.string().min(1).email()
})

/** アカウント登録のバリデーション型 */
export type EmailFormState = z.infer<typeof EmailFormState>

/** アカウント登録のバリデーション設定 */
export const PasswordFormState = z.object({
  [PasswordFormKey.password]: z
    .string()
    .min(6)
    .max(255)
    .regex(PASSWORD_POLICY_REGEX.requiresUppercase, { message: 'uppercase' })
    .regex(PASSWORD_POLICY_REGEX.requiresLowercase, { message: 'lowercase' })
    .regex(PASSWORD_POLICY_REGEX.requiresSpecialCharacter, {
      message: 'specialCharacter'
    })
    .regex(PASSWORD_POLICY_REGEX.requiresDigit, { message: 'digit' }),
  [PasswordFormKey.confirmPassword]: z
    .string()
    .min(6)
    .max(255)
    .regex(PASSWORD_POLICY_REGEX.requiresUppercase, { message: 'uppercase' })
    .regex(PASSWORD_POLICY_REGEX.requiresLowercase, { message: 'lowercase' })
    .regex(PASSWORD_POLICY_REGEX.requiresSpecialCharacter, {
      message: 'specialCharacter'
    })
    .regex(PASSWORD_POLICY_REGEX.requiresDigit, { message: 'digit' })
})

/** アカウント登録のバリデーション型 */
export type PasswordFormState = z.infer<typeof PasswordFormState>

/** メールアドレスのバリデーション設定 */
export const FormStateEmail = EmailFormState.pick({ email: true })

/** メールアドレスのバリデーション型 */
export type FormStateEmail = z.infer<typeof FormStateEmail>

/** パスワードのバリデーション設定 */
export const FormStatePassword = PasswordFormState.pick({ password: true })

/** パスワードのバリデーション型 */
export type FormStatePassword = z.infer<typeof FormStatePassword>

/** 確認用パスワードのバリデーション設定 */
export const FormStateConfirmPassword = PasswordFormState.pick({
  confirmPassword: true
})

/** 確認用パスワードのバリデーション型 */
export type FormStateConfirmPassword = z.infer<typeof FormStateConfirmPassword>
