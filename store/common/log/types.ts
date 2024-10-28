import type { NuxtError } from '#app'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

/** API State */
export type ApiState = Record<string, unknown>

/** API Getters */
export type ApiGetters<S = ApiState> = Record<string, (state: S) => Record<string, void>>

/** API Actions */
export type ApiActions<S = ApiState> = {
  /**
   * アクセスログを送信する
   * @param this API State
   * @param route ルート
   */
  postAccessLog: (this: S, pageBaseUrl: string, route: RouteLocationNormalizedLoaded) => Promise<void>
  /**
   * エラーログを送信する
   * @param this API State
   * @param route ルート
   * @param error エラー情報
   */
  postErrorLog: (
    this: S,
    pageBaseUrl: string,
    route: RouteLocationNormalizedLoaded,
    error: Partial<NuxtError>
  ) => Promise<void>
}
