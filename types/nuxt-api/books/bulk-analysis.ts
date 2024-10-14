/** 本の一括解析結果 */
export type BookBulkAnalysisPostResponseData = {
  /** ユニーク ID */
  uid: string
  /** 本のタイトル */
  title: string
  /** 著者名 */
  author: string
  /** 出版社名 */
  publisher: string
  /** 出版年月日 */
  publishedDate: string
}

/** 本の一括解析結果レスポンス */
export type BookBulkAnalysisPostResponse = BookBulkAnalysisPostResponseData[]
