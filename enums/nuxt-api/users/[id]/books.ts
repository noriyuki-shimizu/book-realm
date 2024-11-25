import z from 'zod'
import { DATE_PATTERN_REGEX, INTEGER_PATTERN_REGEX } from '@/constants/common/regex'

export const UserDetailBookKey = {
  id: 'id',
  title: 'title',
  author: 'author',
  price: 'price',
  publisher: 'publisher',
  publishedDate: 'publishedDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
} as const

export type UserDetailBookKey = typeof UserDetailBookKey[keyof typeof UserDetailBookKey]

/** フォームのキー */
export const UserDetailPostDataKey = {
  title: 'title',
  author: 'author',
  price: 'price',
  publisher: 'publisher',
  publishedDate: 'publishedDate'
} as const

/** フォームのキー型 */
export type UserDetailPostDataKey = typeof UserDetailPostDataKey[keyof typeof UserDetailPostDataKey]

/** 書籍登録時の値 */
export const UserDetailPostData = z.object({
  [UserDetailPostDataKey.title]: z.string().min(1).max(255),
  [UserDetailPostDataKey.author]: z.string().max(255),
  [UserDetailPostDataKey.price]: z.string().regex(INTEGER_PATTERN_REGEX).max(99_999_999),
  [UserDetailPostDataKey.publisher]: z.string().max(255),
  [UserDetailPostDataKey.publishedDate]: z.string().regex(DATE_PATTERN_REGEX)
})

/** 書籍登録時の値型 */
export type UserDetailPostData = z.infer<typeof UserDetailPostData>
