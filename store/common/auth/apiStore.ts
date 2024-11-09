import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import type { Auth } from 'firebase/auth'
import type { ApiState } from './types'
import { StatusCode } from '@/enums/common/http/statusCode'

/**
 * 認証における API Store を返す
 * @returns 認証における API Store
 */
export const useCommonAuthApiStore = defineStore('common-api-auth-store', {
  state: (): ApiState => {
    return {
      signInResponse: null,
      signUpResponse: null,
      signInGoogleResponse: null
    }
  },
  getters: {},
  actions: {
    /**
     * ログインする
     * @param {Auth} auth Firebase Auth
     * @param {{ email: string; password: string }} body リクエストボディ
     */
    async signIn(auth: Auth, body: { email: string; password: string }): Promise<void> {
      try {
        await signInWithEmailAndPassword(auth, body.email, body.password)
        this.signInResponse = {
          data: null,
          status: StatusCode.STATUS_CODE_OK,
          error: null
        }
      } catch (err) {
        const nuxtErr = ErrorUtil.convertNuxtError(err)
        this.signInResponse = {
          data: null,
          status: nuxtErr.statusCode ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
          error: nuxtErr
        }
      }
    },
    /**
     * アカウント登録を行う
     * @param {Auth} auth Firebase Auth
     * @param {{ email: string; password: string }} body リクエストボディ
     */
    async signUp(auth: Auth, body: { email: string; password: string }): Promise<void> {
      try {
        await createUserWithEmailAndPassword(auth, body.email, body.password)
        this.signUpResponse = {
          data: null,
          status: StatusCode.STATUS_CODE_OK,
          error: null
        }
      } catch (err) {
        const nuxtErr = ErrorUtil.convertNuxtError(err)
        this.signUpResponse = {
          data: null,
          status: nuxtErr.statusCode ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
          error: nuxtErr
        }
      }
    },
    /**
     * Google でログインする
     * @param {Auth} auth Firebase Auth
     */
    async signInWithGoogle(auth: Auth): Promise<void> {
      try {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
        this.signInGoogleResponse = {
          data: null,
          status: StatusCode.STATUS_CODE_OK,
          error: null
        }
      } catch (err) {
        const nuxtErr = ErrorUtil.convertNuxtError(err)
        this.signInGoogleResponse = {
          data: null,
          status: nuxtErr.statusCode ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
          error: nuxtErr
        }
      }
    },
    /**
     * サインアウトする
     * @param {Auth} auth Firebase Auth
     */
    async signOut(auth: Auth): Promise<void> {
      await signOut(auth)
    }
  }
})
