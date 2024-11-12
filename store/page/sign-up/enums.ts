import z from 'zod'
import { PASSWORD_POLICY_REGEX } from '@/constants/common/regex'

/** フォームのキー */
export const FormKey = {
  email: 'email',
  password: 'password',
  confirmPassword: 'confirmPassword'
} as const

/** フォームのキー型 */
export type FormKey = typeof FormKey[keyof typeof FormKey]

/** アカウント登録のバリデーション設定 */
export const FormState = z.object({
  [FormKey.email]: z.string().min(1).email(),
  [FormKey.password]: z
    .string()
    .min(6)
    .max(255)
    .regex(PASSWORD_POLICY_REGEX.requiresUppercase, { message: 'uppercase' })
    .regex(PASSWORD_POLICY_REGEX.requiresLowercase, { message: 'lowercase' })
    .regex(PASSWORD_POLICY_REGEX.requiresSpecialCharacter, {
      message: 'specialCharacter'
    })
    .regex(PASSWORD_POLICY_REGEX.requiresDigit, { message: 'digit' }),
  [FormKey.confirmPassword]: z
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
export const FormStateConfirmPassword = FormState.pick({
  confirmPassword: true
})

/** 確認用パスワードのバリデーション型 */
export type FormStateConfirmPassword = z.infer<typeof FormStateConfirmPassword>
