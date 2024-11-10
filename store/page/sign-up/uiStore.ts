import type { FormState } from './enums'
import { FormStateConfirmPassword, FormStateEmail, FormStatePassword } from './enums'
import type { UiState } from './types'
import { errorIssues } from '@/functions/business/validation/error'

/**
 * アカウント登録画面の UI Store を返す
 * @returns アカウント登録画面の UI Store
 */
export const useUiStore = defineStore('page-ui-sign-up-store', {
  state: (): UiState => {
    return {
      formState: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      validation: {
        email: null,
        password: null,
        confirmPassword: null
      },
      submitValidation: {
        email: false,
        password: false,
        confirmPassword: false
      }
    }
  },
  getters: {
    /**
     * メールアドレスのエラーを返す
     * @param {UiState} state ステート
     * @returns {({ code: string; message: string })[]} メールアドレスのエラー
     */
    emailErrors(state): ({ code: string; message: string })[] {
      return errorIssues(state.validation.email)
        .map(issue => {
          return {
            code: issue.code,
            message: issue.message
          }
        })
    },
    /**
     * パスワードのエラーを返す
     * @param {UiState} state ステート
     * @returns {({ code: string; message: string })[]} パスワードのエラー
     */
    passwordErrors(state): ({ code: string; message: string })[] {
      return errorIssues(state.validation.password)
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
      return errorIssues(state.validation.confirmPassword)
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
     * 確認用パスワードをセットする
     */
    setConfirmPassword(value: FormState['confirmPassword']): void {
      this.formState.confirmPassword = value
      this.validation.confirmPassword = FormStateConfirmPassword.safeParse(this.formState)
    },
    /**
     * 送信前のバリデーションエラーをチェックする
     */
    checkPreSubmitInvalidParam(): void {
      this.submitValidation = {
        email: !this.validation.email?.success,
        password: !this.validation.password?.success,
        confirmPassword: !this.validation.confirmPassword?.success
          || this.formState.password !== this.formState.confirmPassword
      }
    }
  }
})

export default useUiStore
