/**
 * 数値をカンマ区切りにフォーマットする
 * @param {number} value 数値
 * @returns {string} カンマ区切りされた文字列
 */
export const formatNumberWithCommas = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 数値を指定した桁数になるように0埋めする
 * @param {number} value 数値
 * @param {number} length 桁数
 * @returns 0埋めされた文字列
 */
export const padZero = (value: number, length: number = 2): string => {
  return value.toString().padStart(length, '0')
}
