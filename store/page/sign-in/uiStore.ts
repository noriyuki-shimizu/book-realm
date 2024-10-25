import type { FormState, UiState } from './types'
import { FormValue } from './types'

/**
 * ログイン画面の UI Store を返す
 * @returns ログイン画面の UI Store
 */
export const useUiStore = () => {
  /** State */
  const _state = useState<UiState>('page-ui-sign-in-store', () => {
    return {
      formState: {
        validation: {
          email: null,
          password: null
        },
        data: {
          email: '',
          password: ''
        }
      }
    }
  })

  /** Getters */
  const getters = {
    /**  */
    formState: computed<FormState>(() => {
      return _state.value.formState
    })
  }

  /** Actions */
  const actions = {
    setEmail(value: FormValue['email']) {
      _state.value.formState.data.email = value
    },
    setPassword(value: FormValue['password']) {
      _state.value.formState.data.password = value
    },
    checkForm() {
      const { email, password } = _state.value.formState.data

      const EmailSchema = FormValue.pick({ email: true })
      _state.value.formState.validation.email = EmailSchema.safeParse({ email })
      const PasswordSchema = FormValue.pick({ password: true })
      _state.value.formState.validation.password = PasswordSchema.safeParse({ password })
    }
  }

  return {
    ...getters,
    ...actions
  }
}
