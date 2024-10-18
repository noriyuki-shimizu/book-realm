/** エラーログ API のリクエストボディ */
export type ErrorLogRequestBody = {
  /** ログレベル */
  level: 'ERROR'
  /** HTTP メソッド */
  method: 'GET'
  /** 画面 URL */
  path: string
  /** 画面 Query */
  query: string
  /** コンテキスト */
  context: {
    /** ユーザー ID */
    userId: number | null
    /** レンダリングモード */
    renderingMode: 'ssr' | 'csr'
  }
  /** レスポンスステータス */
  status: string
  /** エラーメッセージ */
  message: string
  /** Stack Trace */
  stackTrace: string
}
