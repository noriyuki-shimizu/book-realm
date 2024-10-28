import type { UiActions, UiGetters, UiState } from './types'
import { FormValue } from './types'
import { errorIssues } from '@/functions/business/validation/error'
import { defineStore } from '@/store/main'

/**
 * ログイン画面の UI Store を返す
 * @returns ログイン画面の UI Store
 */

export const useUiStore = defineStore<UiState, UiGetters, UiActions>('page-ui-sign-in-store', () => {
  return {
    state: {
      formState: {
        validation: null,
        data: {
          email: '',
          password: ''
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
      }
    },
    actions: {
      setEmail(value: FormValue['email']) {
        this.formState.data.email = value
      },
      setPassword(value: FormValue['password']) {
        this.formState.data.password = value
      },
      checkForm() {
        const { data } = this.formState
        this.formState.validation = FormValue.safeParse(data)
      },
      resetAll() {}
    }
  }
})
