import { FormValue } from './types'
import type { UiActions, UiGetters, UiState } from './types'
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
        validation: null,
        data: {
          email: '',
          password: '',
          confirmPassword: ''
        }
      }
    },
    getters: {
      formState(state) {
        return state.formState
      },
      emailErrorCodes(state) {
        return errorIssues(state.formState.validation)
          .filter(issue => issue.path.some((p) => p === 'email'))
          .map(issue => issue.code)
      },
      passwordErrorCodes(state) {
        return errorIssues(state.formState.validation)
          .filter(issue => issue.path.some((p) => p === 'password'))
          .map(issue => issue.code)
      },
      confirmPasswordErrorCodes(state) {
        return errorIssues(state.formState.validation)
          .filter(issue => issue.path.some((p) => p === 'confirmPassword'))
          .map(issue => issue.code)
      }
    },
    actions: {
      setEmail(value: FormValue['email']) {
        this.formState.data.email = value
      },
      setPassword(value: FormValue['password']) {
        this.formState.data.password = value
      },
      setConfirmPassword(value: FormValue['confirmPassword']) {
        this.formState.data.confirmPassword = value
      },
      checkForm() {
        const { data } = this.formState
        this.formState.validation = FormValue.safeParse(data)
      },
      resetAll() {}
    }
  }
})
