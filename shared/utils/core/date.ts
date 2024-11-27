/* eslint-disable import-x/no-named-as-default-member */
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import ja from 'dayjs/locale/ja'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import type { DateObject } from '@/types/core/date'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale(ja)

/**
 * 現在日時 (UTC) を取得する
 * @returns {Dayjs} - 現在日時 (UTC)
 */
export const getNow = (): Dayjs => {
  return dayjs()
}

/**
 * ドット区切りの日付文字列を解析する
 * @param {string} value 日付文字列
 * @returns {DateObject} 日付オブジェクト
 */
export const parseDotSeparatedDate = (
  value: string
): DateObject => {
  const date = dayjs(value)
  if (date.isValid()) {
    return {
      year: date.year(),
      month: date.month() + 1,
      day: date.date()
    }
  }

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

/**
 * 文字列から日付オブジェクトにパースする
 * @param {`${string}.${string}.${string}`} value 対象の日付文字列
 * @returns {Date} Date
 */
export const parseDotSeparatedDateObject = (value: `${string}.${string}.${string}`): Date => {
  const date = dayjs(value)
  if (!date.isValid()) {
    throw new Error(`Invalid date, value: ${value}`)
  }

  return date.toDate()
}
