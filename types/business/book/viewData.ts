import type { DateObject } from '@/types/core/date'

/** 表示データ */
export type BookListViewData = {
  /** ID */
  id: number
  /** 本のタイトル */
  title: string
  /** 著者名 */
  author: string | null
  /** 価格 */
  price: number | null
  /** 出版社名 */
  publisher: string | null
  /** 出版年月日オブジェクト */
  publishedDate: DateObject | null
  /** 作成日時 */
  createdAt: DateObject | null
  /** 更新日時 */
  updatedAt: DateObject | null
}
