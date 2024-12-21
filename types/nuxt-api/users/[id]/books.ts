import type { UserDetailBookKey } from '@/enums/nuxt-api/users/[id]/books'
import type { StatusCode } from '@/enums/common/http/statusCode'

/** ユーザー書籍データ */
export type UserDetailBookData = {
  /** ID */
  [UserDetailBookKey.id]: number
  /** 書籍タイトル */
  [UserDetailBookKey.title]: string
  /** 著者名 */
  [UserDetailBookKey.author]: string
  /** 価格 */
  [UserDetailBookKey.price]: number
  /** 出版社 */
  [UserDetailBookKey.publisher]: string
  /** 出版日 */
  [UserDetailBookKey.publishedDate]: string
  /** 作成日時 */
  [UserDetailBookKey.createdAt]: string
  /** 更新日時 */
  [UserDetailBookKey.updatedAt]: string
  /** 削除日時 */
  [UserDetailBookKey.deletedAt]: string
}

/** 書籍の削除データ */
export type UserDetailBookDeleteData = {
  /** ID */
  [UserDetailBookKey.id]: number
}

/** 書籍一覧取得レスポンス */
export type UserDetailBookGetResponse = {
  /** HTTP Status Code */
  statusCode: StatusCode
  /** ユーザー書籍データリスト */
  data: UserDetailBookData[]
}

/** ユーザー書籍データ */
export type UserDetailBookPostData = {
  /** ID */
  [UserDetailBookKey.id]?: number
  /** 書籍タイトル */
  [UserDetailBookKey.title]: string
  /** 著者名 */
  [UserDetailBookKey.author]: string
  /** 価格 */
  [UserDetailBookKey.price]: string
  /** 出版社 */
  [UserDetailBookKey.publisher]: string
  /** 出版日 */
  [UserDetailBookKey.publishedDate]: string
}

/** 書籍の一括登録レスポンス */
export type UserDetailBookPostResponse = {
  /** HTTP Status Code */
  statusCode: StatusCode
  /** 登録後のメッセージ */
  message: string
}
