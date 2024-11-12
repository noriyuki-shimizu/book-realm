import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  verifyPasswordResetCode
} from 'firebase/auth'
import type { Auth } from 'firebase/auth'
import type { ApiState } from './types'
import { StatusCode } from '@/enums/common/http/statusCode'
import { ErrorUtil } from '#shared/utils/core'

/**
 * 認証における API Store を返す
 * @returns 認証における API Store
 */
export const useCommonAuthApiStore = defineStore('common-api-auth-store', {
  state: (): ApiState => {
    return {
      signInResponse: null,
      signUpResponse: null,
      signInGoogleResponse: null,
      sendPasswordResetEmailResponse: null,
      passwordResetResponse: null
    }
  },
  getters: {},
  actions: {
    /**
     * ログインする
     * @param {Auth} auth Firebase Auth
     * @param {{ email: string; password: string }} body リクエストボディ
     */
    async signIn(
      auth: Auth,
      body: { email: string; password: string }
    ): Promise<void> {
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
          status: nuxtErr.statusCode
            ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
          error: nuxtErr
        }
      }
    },
    /**
     * アカウント登録を行う
     * @param {Auth} auth Firebase Auth
     * @param {{ email: string; password: string }} body リクエストボディ
     */
    async signUp(
      auth: Auth,
      body: { email: string; password: string }
    ): Promise<void> {
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
          status: nuxtErr.statusCode
            ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
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
          status: nuxtErr.statusCode
            ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
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
    },
    /**
     * パスワードリセットメールを送信する
     * @param {Auth} auth Firebase Auth
     * @param {string} email メールアドレス
     */
    async sendPasswordResetEmail(auth: Auth, email: string): Promise<void> {
      try {
        await sendPasswordResetEmail(auth, email)
        this.sendPasswordResetEmailResponse = {
          data: null,
          status: StatusCode.STATUS_CODE_OK,
          error: null
        }
      } catch (err) {
        const nuxtErr = ErrorUtil.convertNuxtError(err)
        this.sendPasswordResetEmailResponse = {
          data: null,
          status: nuxtErr.statusCode
            ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
          error: nuxtErr
        }
      }
    },
    async passwordReset(
      auth: Auth,
      password: string,
      resetParam: { mode: string; oobCode: string }
    ) {
      try {
        const { mode, oobCode } = resetParam
        if (mode !== 'resetPassword') {
          throw new Error('Invalid mode')
        }
        await verifyPasswordResetCode(auth, oobCode)
        await confirmPasswordReset(auth, oobCode, password)
        this.passwordResetResponse = {
          data: null,
          status: StatusCode.STATUS_CODE_OK,
          error: null
        }
      } catch (err) {
        const nuxtErr = ErrorUtil.convertNuxtError(err)
        this.passwordResetResponse = {
          data: null,
          status: nuxtErr.statusCode
            ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
          error: nuxtErr
        }
      }
    }
  }
})

export default useCommonAuthApiStore
