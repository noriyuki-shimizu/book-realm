import { FormStateConfirmPassword } from '../sign-up'
import { FormStateEmail, FormStatePassword } from './enums'
import type { EmailFormState, PasswordFormState } from './enums'
import type { UiState } from './types'
import { errorIssues } from '@/functions/business/validation/error'

/**
 * ログイン画面の UI Store を返す
 * @returns ログイン画面の UI Store
 */
export const useUiStore = defineStore('page-ui-forgot-password-store', {
  state: (): UiState => {
    return {
      emailFormState: {
        email: ''
      },
      emailValidation: {
        email: null
      },
      emailSubmitValidation: {
        email: false
      },
      passwordFormState: {
        password: '',
        confirmPassword: ''
      },
      passwordValidation: {
        password: null,
        confirmPassword: null
      },
      passwordSubmitValidation: {
        password: false,
        confirmPassword: false
      }
    }
  },
  getters: {
    /**
     * パスワードのエラーを返す
     * @param {UiState} state ステート
     * @returns {({ code: string; message: string })[]} パスワードのエラー
     */
    passwordErrors(state): ({ code: string; message: string })[] {
      return errorIssues(state.passwordValidation.password)
        .map(issue => {
          return {
            code: issue.code,
            message: issue.message
          }
        })
    },
    /**
     * 確認用パスワードのエラーを返す
     * @param {UiState} state ステート
     * @returns {({ code: string; message: string })[]} 確認用パスワードのエラー
     */
    confirmPasswordErrors(state): ({ code: string; message: string })[] {
      return errorIssues(state.passwordValidation.confirmPassword)
        .map(issue => {
          return {
            code: issue.code,
            message: issue.message
          }
        })
    }
  },
  actions: {
    /**
     * メールアドレスをセットする
     */
    setEmail(value: EmailFormState['email']): void {
      this.emailFormState.email = value
      this.emailValidation.email = FormStateEmail.safeParse(this.emailFormState)
    },
    /**
     * パスワードをセットする
     */
    setPassword(value: PasswordFormState['password']): void {
      this.passwordFormState.password = value
      this.passwordValidation.password = FormStatePassword.safeParse(this.passwordFormState)
    },
    /**
     * 確認用パスワードをセットする
     */
    setConfirmPassword(value: PasswordFormState['confirmPassword']): void {
      this.passwordFormState.confirmPassword = value
      this.passwordValidation.confirmPassword = FormStateConfirmPassword.safeParse(this.passwordFormState)
    },
    /**
     * 送信前のメールバリデーションエラーをチェックする
     */
    checkPreEmailSubmitInvalidParam(): void {
      this.emailSubmitValidation = {
        email: !this.emailValidation.email?.success
      }
    },
    /**
     * 送信前のパスワードバリデーションエラーをチェックする
     */
    checkPrePasswordSubmitInvalidParam(): void {
      this.passwordSubmitValidation = {
        password: !this.passwordValidation.password?.success,
        confirmPassword: !this.passwordValidation.confirmPassword?.success
          || this.passwordFormState.password !== this.passwordFormState.confirmPassword
      }
    }
  }
})

export default useUiStore
