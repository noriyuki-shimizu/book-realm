import { FormStateEmail, FormStatePassword } from './types'
import type { FormState, UiActions, UiGetters, UiState } from './types'
import { errorIssues } from '@/functions/business/validation/error'
import { defineStore } from '@/store/main'

/**
 * ログイン画面の UI Store を返す
 * @returns ログイン画面の UI Store
 */
export const useUiStore = defineStore<UiState, UiGetters, UiActions>('page-ui-sign-in-store', () => {
  return {
    state: {
      validation: {
        email: FormStateEmail.safeParse({ email: '' }),
        password: FormStatePassword.safeParse({ password: '' })
      },
      formState: {
        email: '',
        password: ''
      },
      submitInvalidParam: {
        email: false,
        password: false
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
      checkPreSubmitInvalidParam() {
        this.submitInvalidParam.email = !this.validation.email.success
        this.submitInvalidParam.password = !this.validation.password.success
      },
      resetAll() {}
    }
  }
})
