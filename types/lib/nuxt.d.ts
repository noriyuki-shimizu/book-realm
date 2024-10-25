import type { Auth } from 'firebase/auth'
import type { AppFetchResponse } from 'ofetch'
import type { FetchRawParameters } from '@/types/core/http'

declare module '#app' {
  interface NuxtApp {
    /**
     * Nuxt Server API 用の Http Client 関数
     * @param {FetchRawParameters<T>[0]} request リクエスト
     * @param {FetchRawParameters<T>[1]} options オプション
     * @returns {Promise<AppFetchResponse<T>>} レスポンス
     */
    $nuxtServerHttpClient: <T = object>(
      request: FetchRawParameters<T>[0],
      options?: FetchRawParameters<T>[1]
    ) => Promise<AppFetchResponse<T>>
    /** Firebase Auth */
    $auth: Auth
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    /**
     * Nuxt Server API 用の Http Client 関数
     * @param {FetchRawParameters<T>[0]} request リクエスト
     * @param {FetchRawParameters<T>[1]} options オプション
     * @returns {Promise<AppFetchResponse<T>>} レスポンス
     */
    $nuxtServerHttpClient: <T = object>(
      request: FetchRawParameters<T>[0],
      options?: FetchRawParameters<T>[1]
    ) => Promise<AppFetchResponse<T>>
    /** Firebase Auth */
    $auth: Auth
  }
}

export {}
