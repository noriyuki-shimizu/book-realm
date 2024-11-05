import { FormStateConfirmPassword, FormStateEmail, FormStatePassword } from './types'
import type { FormState, UiActions, UiGetters, UiState } from './types'
import { errorIssues } from '@/functions/business/validation/error'
import { defineStore } from '@/store/main'

/**
 * アカウント登録画面の UI Store を返す
 * @returns アカウント登録画面の UI Store
 */
export const useUiStore = defineStore<UiState, UiGetters, UiActions>('page-ui-sign-up-store', () => {
  return {
    state: {
      formState: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      validation: {
        email: FormStateEmail.safeParse({ email: '' }),
        password: FormStatePassword.safeParse({ password: '' }),
        confirmPassword: FormStateConfirmPassword.safeParse({ confirmPassword: '' })
      },
      submitInvalidParam: {
        email: false,
        password: false,
        confirmPassword: false
      }
    },
    getters: {
      formState(state) {
        return state.formState
      },
      emailErrors(state) {
        return errorIssues(state.validation.email)
          .map(issue => {
            return {
              code: issue.code,
              message: issue.message
            }
          })
      },
      passwordErrors(state) {
        return errorIssues(state.validation.password)
          .map(issue => {
            return {
              code: issue.code,
              message: issue.message
            }
          })
      },
      confirmPasswordErrors(state) {
        return errorIssues(state.validation.confirmPassword)
          .map(issue => {
            return {
              code: issue.code,
              message: issue.message
            }
          })
      },
      submitInvalidParam(state) {
        return state.submitInvalidParam
      }
    },
    actions: {
      setEmail(value: FormState['email']) {
        this.formState.email = value
        this.validation.email = FormStateEmail.safeParse({ email: value })
      },
      setPassword(value: FormState['password']) {
        this.formState.password = value
        this.validation.password = FormStatePassword.safeParse({ password: value })
      },
      setConfirmPassword(value: FormState['confirmPassword']) {
        this.formState.confirmPassword = value
        this.validation.confirmPassword = FormStateConfirmPassword.safeParse({ confirmPassword: value })
      },
      checkPreSubmitInvalidParam() {
        this.submitInvalidParam.email = !this.validation.email.success
        this.submitInvalidParam.password = !this.validation.password.success
        this.submitInvalidParam.confirmPassword = !this.validation.confirmPassword.success
          || this.formState.password !== this.formState.confirmPassword
      },
      resetAll() {}
    }
  }
})
