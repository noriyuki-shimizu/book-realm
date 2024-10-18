import type { RouteLocationNormalizedLoaded } from 'vue-router'

/**
 * 画面情報のデータを受け取り、URL のクエリ文字列を返す
 * @param {string} baseUrl - アプリケーションURL
 * @param {RouteLocationNormalizedLoaded} route - 画面情報
 * @returns クエリ文字列を取得する関数
 */
export const generateQueryStringFromRoute = (baseUrl: string) => (route: RouteLocationNormalizedLoaded): string => {
  const { searchParams } = new URL(`${baseUrl}${route.fullPath}`)
  const searchParamQuery = searchParams.toString()
  return LangUtil.isEmpty(searchParamQuery) ? '' : `?${searchParamQuery}`
}

/**
 * 文字列と最大長を入力として受け取り、文字列が最大長を超える場合は、最後に「...」が追加された切り詰められた文字列を返す
 * @param {string} str - `str` 対象の文字列
 * @param {number} maxLength - 文字列を切り詰める最大長です。
 * @returns 切り捨てられた文字列
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length > maxLength) {
    return `${str.slice(0, maxLength)}...`
  }
  return str
}
