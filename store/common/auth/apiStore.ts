import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import type { ApiActions, ApiGetters, ApiState } from './types'
import { StatusCode } from '@/enums/common/http/statusCode'
import { defineStore } from '@/store/main'

/**
 * 認証における API Store を返す
 * @returns 認証における API Store
 */
export const useCommonAuthApiStore = defineStore<ApiState, ApiGetters, ApiActions>('common-api-auth-store', () => {
  const provider = new GoogleAuthProvider()

  return {
    state: {
      user: null,
      signInResponse: null,
      signUpResponse: null,
      signInGoogleResponse: null
    },
    getters: {
      isLoggedIn(state) {
        return !LangUtil.isNull(state.user)
      },
      user(state) {
        return state.user
      },
      signInResponse(state) {
        return state.signInResponse
      },
      signUpResponse(state) {
        return state.signUpResponse
      },
      signInGoogleResponse(state) {
        return state.signInGoogleResponse
      }
    },
    actions: {
      setUser(user) {
        this.user = user
      },
      async signIn(auth, { email, password }) {
        try {
          await signInWithEmailAndPassword(auth, email, password)
          this.signInResponse = {
            data: null,
            status: StatusCode.STATUS_CODE_OK,
            error: null
          }
        } catch (err) {
          const nuxtErr = ErrorUtil.convertNuxtError(err)
          this.user = null
          this.signInResponse = {
            data: null,
            status: nuxtErr.statusCode ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
            error: nuxtErr
          }
        }
      },
      async signUp(auth, { email, password }) {
        try {
          await createUserWithEmailAndPassword(auth, email, password)
          this.signUpResponse = {
            data: null,
            status: StatusCode.STATUS_CODE_OK,
            error: null
          }
        } catch (err) {
          const nuxtErr = ErrorUtil.convertNuxtError(err)
          this.user = null
          this.signUpResponse = {
            data: null,
            status: nuxtErr.statusCode ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
            error: nuxtErr
          }
        }
      },
      async signInWithGoogle(auth) {
        try {
          await signInWithPopup(auth, provider)
          this.signInGoogleResponse = {
            data: null,
            status: StatusCode.STATUS_CODE_OK,
            error: null
          }
        } catch (err) {
          const nuxtErr = ErrorUtil.convertNuxtError(err)
          this.user = null
          this.signInGoogleResponse = {
            data: null,
            status: nuxtErr.statusCode ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
            error: nuxtErr
          }
        }
      },
      async signOut(auth) {
        await signOut(auth)
      },
      resetAll() {}
    }
  }
})
