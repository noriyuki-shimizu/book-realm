import { FirebaseError } from 'firebase/app'
import { FetchError } from 'ofetch'
import type { NuxtError } from '#app'
import { isObject, isString, isUndefined } from './lang'
import { StatusCode } from '@/enums/common/http/statusCode'
import { FirebaseErrorStatusCode } from '@/enums/common/firebase/code'
import type { ApiResponseState } from '@/types/store/response'

/**
 * エラーを Nuxt エラーデータに変換
 * @param {unknown} err エラーオブジェクト
 * @returns {Partial<NuxtError>} Nuxt エラーデータ
 */
export const convertNuxtError = (err: unknown): Partial<NuxtError> => {
  if ((isString(err) || isObject(err)) && isNuxtError(err)) {
    return err
  }
  if (err instanceof FetchError) {
    return {
      name: err.name,
      message: err.message,
      cause: err.cause,
      stack: err.stack,
      statusCode: err.status || StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
      data: err.data
    }
  }
  if (err instanceof FirebaseError) {
    const code = err.code as keyof typeof FirebaseErrorStatusCode
    return {
      name: err.name,
      message: err.message,
      cause: err.cause,
      stack: err.stack,
      statusCode: FirebaseErrorStatusCode[code] || StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
      data: err.customData
    }
  }
  if (err instanceof Error) {
    return {
      name: err.name,
      message: err.message,
      cause: err.cause,
      stack: err.stack,
      statusCode: StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
      data: null
    }
  }
  return {
    name: 'AppError',
    message: 'Internal server error',
    statusCode: StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
    data: null
  }
}

/**
 * レスポンス配列で最初に下記のステータスコードに該当した場合、エラーをスローする
 * - 404（Not Found）
 * - 429（Too Many Requests）
 * - 500（Internal Server Error）以上
 *
 * @param { ApiResponseState<unknown>[] } apiResponses - レスポンス配列
 *
 * @throws {Partial<NuxtError>}
 * レスポンス配列内にステータスコードが404（Not Found）、429（Too Many Requests）、500以上（Internal Server Error）の
 * エラーレスポンスが含まれている場合、そのエラーをスローする。
 */
export const throwFirstApiError = (apiResponses: ApiResponseState<unknown>[]): void => {
  const apiErrorResponse = apiResponses.find((response) => {
    return (
      response.status === StatusCode.STATUS_CODE_NOT_FOUND
      || response.status === StatusCode.STATUS_CODE_TOO_MANY_REQUESTS
      || response.status >= StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR
    )
  })

  if (!isUndefined(apiErrorResponse)) {
    throw apiErrorResponse.error
  }
}
