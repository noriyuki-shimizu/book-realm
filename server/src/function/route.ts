import type { QueryValue } from 'ufo'
import { UserDetailBookKey, UserDetailPostData } from '@/enums/nuxt-api/users/[id]/books'
import type { UserDetailBookPostData } from '@/types/nuxt-api/users/[id]/books'

/**
 * ユーザー書籍データキーかどうか
 * @param {QueryValue | QueryValue[]} keys キー
 * @returns {keys is UserDetailBookKey[]} ユーザー書籍データキーかどうか
 */
export const isUserDetailBookKey = (key: QueryValue | QueryValue[]): key is UserDetailBookKey => {
  const UserDetailBookKeyValues = Object.keys(UserDetailBookKey)
  return !Array.isArray(key) && typeof key === 'string' && UserDetailBookKeyValues.includes(key)
}

/**
 * ユーザー書籍データキーかどうか
 * @param {QueryValue | QueryValue[]} keys キー
 * @returns {keys is UserDetailBookKey[]} ユーザー書籍データキーかどうか
 */
export const isUserDetailBookKeyList = (keys: QueryValue | QueryValue[]): keys is UserDetailBookKey[] => {
  const UserDetailBookKeyValues = Object.keys(UserDetailBookKey)
  return Array.isArray(keys) && keys.every((key) => {
    return UserDetailBookKeyValues.includes(key)
  })
}

/**
 * ユーザー書籍データかどうか
 * @param {unknown} data 対象のデータ
 * @returns {data is UserDetailBookPostData[]} ユーザー書籍データかどうか
 */
export const isUserDetailBookPostData = (data: unknown): data is UserDetailBookPostData[] => {
  return Array.isArray(data) && data.every((d) => {
    const result = UserDetailPostData.safeParse(d)
    console.log(d, result)
    return result.success
  })
}
