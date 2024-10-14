import type { NuxtError } from '#app'

/** API レスポンスの状態 */
export type ApiResponseState<T> = {
  /** レスポンスデータ */
  data: T | null
  /** HTTP ステータスコード（リクエスト結果） */
  status: number
  /** エラー情報 */
  error: Partial<NuxtError> | null
}
