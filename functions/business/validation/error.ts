import type { SafeParseReturnType, ZodIssue } from 'zod'
import { LangUtil } from '#shared/utils/core'

/**
 * エラーの問題配列を返す
 *
 * @template T - バリデーション対象の型
 *
 * @param {SafeParseReturnType<T, T> | null} validation - バリデーション結果
 * @returns {ZodIssue[]} エラーの問題配列
 */
export const errorIssues = <T>(
  validation: SafeParseReturnType<T, T> | null
): ZodIssue[] => {
  if (LangUtil.isNull(validation) || validation.success) {
    return []
  }
  return validation.error.issues
}
