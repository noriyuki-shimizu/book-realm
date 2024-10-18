/** HTTP Status Code Enum */
export const StatusCode = {
  STATUS_CODE_OK: 200,
  STATUS_CODE_CREATED: 201,
  STATUS_CODE_NO_CONTENT: 204,
  STATUS_CODE_BAD_REQUEST: 400,
  STATUS_CODE_NOT_FOUND: 404,
  STATUS_CODE_PAYLOAD_TOO_LARGE: 413,
  STATUS_CODE_TOO_MANY_REQUESTS: 429,
  STATUS_CODE_INTERNAL_SERVER_ERROR: 500
} as const

/** HTTP Status Code Enum Type */
export type StatusCode = (typeof StatusCode)[keyof typeof StatusCode]
