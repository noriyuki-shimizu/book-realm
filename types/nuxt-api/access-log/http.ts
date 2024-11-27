/** アクセスログ API のリクエストボディ */
export type AccessLogRequestBody = {
  /** ログレベル */
  level: 'INFO'
  /** HTTP メソッド */
  method: 'GET'
  /** 画面 URL */
  path: string
  /** 画面 Query */
  query: string
  /** コンテキスト */
  context: {
    /** ユーザー ID */
    userId: string | null
    /** レンダリングモード */
    renderingMode: 'ssr' | 'csr'
  }
  /** レスポンスステータス */
  status: string
}
