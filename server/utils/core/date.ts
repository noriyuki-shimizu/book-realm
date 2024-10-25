/* eslint-disable import-x/no-named-as-default-member */
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import ja from 'dayjs/locale/ja'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

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
