import type { Auth, User } from 'firebase/auth'
import type { ApiResponseState } from '@/types/store/response'

export type ApiGetters<S = ApiState> = {
  /**
   * ログインしているかどうかを返す
   * @param {S} state - ステート
   * @returns {boolean} ログインしているかどうか
   */
  isLoggedIn: (state: S) => boolean
  /**
   * ユーザーを返す
   * @param {S} state - ステート
   * @returns {User | null} ユーザー
   */
  user: (state: S) => User | null
  /**
   * ユーザークレデンシャルを返す
   * @param {S} state - ステート
   * @returns {ApiResponseState<void> | null} ユーザークレデンシャル
   */
  signInResponse: (state: S) => ApiResponseState<void> | null
  /**
   * メールアドレス・パスワードにおけるアカウント登録レスポンスを返す
   * @param {S} state - ステート
   * @returns {ApiResponseState<void> | null} メールアドレス・パスワードにおけるアカウント登録レスポンス
   */
  signUpResponse: (state: S) => ApiResponseState<void> | null
  /**
   * Google ログインレスポンスを返す
   * @param {S} state - ステート
   * @returns {ApiResponseState<void> | null} Google
   */
  signInGoogleResponse: (state: S) => ApiResponseState<void> | null
}

export type ApiActions<S = ApiState> = {
  /**
   * ユーザーをセットする
   * @param {User} user - ユーザー
   */
  setUser: (this: S, user: User | null) => void
  /**
   * メールアドレス・パスワードでログインする
   * @param {string} email - メールアドレス
   * @param {string} password - パスワード
   */
  signIn: (this: S, auth: Auth, body: { email: string; password: string }) => Promise<void>
  /**
   * メールアドレス・パスワードにおけるアカウント登録を行う
   * @param {string} email - メールアドレス
   * @param {string} password - パスワード
   */
  signUp: (this: S, auth: Auth, body: { email: string; password: string }) => Promise<void>
  /**
   * Google でログインする
   */
  signInWithGoogle: (this: S, auth: Auth) => Promise<void>
  /**
   * サインアウトする
   */
  signOut: (this: S, auth: Auth) => Promise<void>
}

/** API State */
export type ApiState = {
  user: User | null
  /** メールアドレス・パスワードログインレスポンス */
  signInResponse: ApiResponseState<void> | null
  /** メールアドレス・パスワードにおけるアカウント登録レスポンス */
  signUpResponse: ApiResponseState<void> | null
  /** Google ログインレスポンス */
  signInGoogleResponse: ApiResponseState<void> | null
}
