import { LangUtil } from '#shared/utils/core'
import { ERROR_TITLE } from '@/constants/components/head/title'

/**
 * ステータスコードからエラータイトルを取得する
 * @param {number} statusCode HTTP Status Code
 * @returns {string} エラータイトル
 */
export const getErrorTitle = (statusCode: number): string => {
  const title = ERROR_TITLE[statusCode]
  if (LangUtil.isUndefined(title)) {
    return 'An Error Occurred'
  }
  return title
}
