import type { QueryValue } from 'ufo'
import { UserDetailBookKey, UserDetailPostData } from '@/enums/nuxt-api/users/[id]/books'
import type { UserDetailBookDeleteData, UserDetailBookPostData } from '@/types/nuxt-api/users/[id]/books'

/**
 * ユーザー書籍データキーかどうか
 * @param {QueryValue | QueryValue[]} keys キー
 * @returns {keys is UserDetailBookKey[]} ユーザー書籍データキーかどうか
 */
export const isUserDetailBookKey = (key: QueryValue | QueryValue[]): key is UserDetailBookKey => {
  const UserDetailBookKeyKeys = Object.keys(UserDetailBookKey)
  return !Array.isArray(key) && typeof key === 'string' && UserDetailBookKeyKeys.includes(key)
}

/**
 * ユーザー書籍データキーかどうか
 * @param {QueryValue | QueryValue[]} keys キー
 * @returns {keys is UserDetailBookKey[]} ユーザー書籍データキーかどうか
 */
export const isUserDetailBookKeyList = (keys: QueryValue | QueryValue[]): keys is UserDetailBookKey[] => {
  const UserDetailBookKeyKeys = Object.keys(UserDetailBookKey)
  return Array.isArray(keys) && keys.every((key) => {
    return UserDetailBookKeyKeys.includes(key)
  })
}

/**
 * 書籍の削除データかどうか
 * @param {unknown} data 対象のデータ
 * @returns {data is UserDetailBookDeleteData[]} 書籍の削除データかどうか
 */
export const isUserDetailBookDeleteData = (data: unknown): data is UserDetailBookDeleteData => {
  const keys = typeof data === 'object' && data !== null ? Object.keys(data) : []
  return keys.length === 1 && keys.includes(UserDetailBookKey.id)
}

/**
 * ユーザー書籍データかどうか
 * @param {unknown} data 対象のデータ
 * @returns {data is UserDetailBookBody[]} ユーザー書籍データかどうか
 */
export const isUserDetailBookPostData = (data: unknown): data is UserDetailBookPostData[] => {
  return Array.isArray(data) && data.every((d) => {
    const result = UserDetailPostData.safeParse(d)
    return result.success
  })
}
