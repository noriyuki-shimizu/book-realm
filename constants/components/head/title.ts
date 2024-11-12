import type { DeepReadonly } from '#app/compat/capi'
import { StatusCode } from '@/enums/common/http/statusCode'

/** Error Title */
export const ERROR_TITLE: DeepReadonly<Record<number, string | undefined>> = {
  [StatusCode.STATUS_CODE_NOT_FOUND]: `${StatusCode.STATUS_CODE_NOT_FOUND} Not Found`,
  [StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR]: `${StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR} Internal Server Error`
}
