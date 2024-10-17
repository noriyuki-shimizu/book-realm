/** 本の一括解析結果 */
export type BookBulkAnalysisPostResponseData = {
  /** ユニーク ID */
  uid: string
  /** 本のタイトル */
  title: string
  /** 著者名 */
  author: string | null
  /** 価格 */
  price: number | null
  /** 出版社名 */
  publisher: string | null
  /** 出版年月日 */
  publishedDate: string | null
}

/** 本の一括解析結果レスポンス */
export type BookBulkAnalysisPostResponse = BookBulkAnalysisPostResponseData[]
