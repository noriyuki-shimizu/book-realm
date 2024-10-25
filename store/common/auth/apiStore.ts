import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import type { ApiState } from './types'
import { StatusCode } from '@/enums/common/http/statusCode'
import type { ApiResponseState } from '@/types/store/response'

/**
 * 認証における API Store を返す
 * @returns 認証における API Store
 */
export const useCommonAuthApiStore = () => {
  const { $auth } = useNuxtApp()
  const provider = new GoogleAuthProvider()

  /** State */
  const _state = useState<ApiState>('common-api-auth-store', () => {
    return {
      userCredential: null,
      signInResponse: null,
      signInGoogleResponse: null
    }
  })

  /** Getters */
  const getters = {
    /** メールアドレス・パスワードログインレスポンス */
    signInResponse: computed<ApiResponseState<void> | null>(() => {
      return _state.value.signInResponse
    }),
    /** Google ログインレスポンス */
    signInGoogleResponse: computed<ApiResponseState<void> | null>(() => {
      return _state.value.signInGoogleResponse
    })
  }

  /** Actions */
  const actions = {
    /**
     * メールアドレス・パスワードでログイン
     * @param {string} email メールアドレス
     * @param {string} password パスワード
     */
    signIn: async (email: string, password: string): Promise<void> => {
      try {
        const userCredential = await signInWithEmailAndPassword($auth, email, password)
        _state.value.userCredential = userCredential
        _state.value.signInResponse = {
          data: null,
          status: StatusCode.STATUS_CODE_OK,
          error: null
        }
      } catch (err) {
        const nuxtErr = ErrorUtil.convertNuxtError(err)
        _state.value.userCredential = null
        _state.value.signInResponse = {
          data: null,
          status: nuxtErr.statusCode ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
          error: nuxtErr
        }
      }
    },
    /**
     * Google でログイン
     */
    signInWithGoogle: async (): Promise<void> => {
      try {
        const userCredential = await signInWithPopup($auth, provider)
        _state.value.userCredential = userCredential
        _state.value.signInGoogleResponse = {
          data: null,
          status: StatusCode.STATUS_CODE_OK,
          error: null
        }
      } catch (err) {
        const nuxtErr = ErrorUtil.convertNuxtError(err)
        _state.value.userCredential = null
        _state.value.signInGoogleResponse = {
          data: null,
          status: nuxtErr.statusCode ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
          error: nuxtErr
        }
      }
    },
    /**
     * ログアウト
     */
    signOut: async (): Promise<void> => {
      await signOut($auth)
    }
  }

  return {
    ...getters,
    ...actions
  }
}
