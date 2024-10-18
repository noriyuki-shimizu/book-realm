import dayjs from 'dayjs'
import type { DateObject } from '@/types/core/date'

/**
 * 日付文字列を解析する
 * @param {string} value 日付文字列
 * @returns {DateObject} 日付オブジェクト
 */
export const parseDateString = (value: string, format: string = 'YYYY.MM.DD'): DateObject => {
  const date = dayjs(value, format)

  if (!date.isValid()) {
    throw new Error(`Invalid date format, value: ${value}`)
  }

  return {
    year: date.year(),
    month: date.month() + 1,
    day: date.date()
  }
}
