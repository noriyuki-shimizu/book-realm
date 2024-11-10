import { FormStateEmail, FormStatePassword } from './enums'
import type { FormState } from './enums'
import type { UiState } from './types'

/**
 * ログイン画面の UI Store を返す
 * @returns ログイン画面の UI Store
 */
export const useUiStore = defineStore('page-ui-sign-in-store', {
  state: (): UiState => {
    return {
      formState: {
        email: '',
        password: ''
      },
      validation: {
        email: null,
        password: null
      },
      submitValidation: {
        email: false,
        password: false
      }
    }
  },
  getters: {},
  actions: {
    /**
     * メールアドレスをセットする
     */
    setEmail(value: FormState['email']): void {
      this.formState.email = value
      this.validation.email = FormStateEmail.safeParse(this.formState)
    },
    /**
     * パスワードをセットする
     */
    setPassword(value: FormState['password']): void {
      this.formState.password = value
      this.validation.password = FormStatePassword.safeParse(this.formState)
    },
    /**
     * 送信前のバリデーションエラーをチェックする
     */
    checkPreSubmitInvalidParam(): void {
      this.submitValidation = {
        email: !this.validation.email?.success,
        password: !this.validation.password?.success
      }
    }
  }
})

export default useUiStore
