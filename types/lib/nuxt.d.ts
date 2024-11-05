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
  }

  interface PageMeta {
    /** 認証なしに閲覧可能なページかどうか */
    auth?: boolean
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
  }
}

export {}
