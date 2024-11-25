import type { UserDetailBookKey, UserDetailPostData } from '@/enums/nuxt-api/users/[id]/books'

/** 書籍管理 API のリクエストパスパラメータ */
export type UserDetailBookRequestParam = {
  /** ユーザー ID */
  userId: string
}

export type UserDetailBookRequestQuery = {
  keys: UserDetailBookKey[]
}

/** 書籍一括登録のリクエストボディ */
export type UserDetailBookPostRequestBody = UserDetailPostData[]
