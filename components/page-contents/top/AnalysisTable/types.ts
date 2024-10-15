import type { DateObject } from '@/types/core/date'

/** 表示データ */
export type ViewData = {
  /** ユニーク ID */
  uid: string
  /** 本のタイトル */
  title: string
  /** 著者名 */
  author: string
  /** 価格 */
  price: number
  /** 出版社名 */
  publisher: string
  /** 出版年月日オブジェクト */
  publishedDate: DateObject
}[]
