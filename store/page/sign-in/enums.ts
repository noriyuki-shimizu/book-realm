import z from 'zod'

/** フォームのキー */
export const FormKey = {
  email: 'email',
  password: 'password'
} as const

/** フォームのキー型 */
export type FormKey = typeof FormKey[keyof typeof FormKey]

/** フォーム値 */
export const FormState = z.object({
  [FormKey.email]: z.string().min(1).email(),
  [FormKey.password]: z.string().min(1).max(255)
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
