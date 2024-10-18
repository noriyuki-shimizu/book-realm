import type { DateObject } from '@/types/core/date'

/**
 * ドット区切りの日付文字列を解析する
 * @param {string} value 日付文字列
 * @returns {DateObject} 日付オブジェクト
 */
export const parseDotSeparatedDate = (value: `${string}.${string}.${string}`): DateObject => {
  const dateParts = value.split('.').map(Number)
  const hasInvalidDatePart = dateParts.some(date => isNaN(date))

  if (hasInvalidDatePart) {
    throw new Error(`Invalid date format, value: ${value}`)
  }

  return {
    year: dateParts[0],
    month: dateParts[1],
    day: dateParts[2]
  }
}
