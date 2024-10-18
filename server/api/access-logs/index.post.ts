import camelcaseKeys from 'camelcase-keys'
import { consola } from 'consola'
import snakecaseKeys from 'snakecase-keys'
import { DATE_TIME_YYYYMMDDHHMMSS_COLON } from '@/constants/date'
import { StatusCode } from '@/enums/common/http/statusCode'
import type { AccessLogRequestBody } from '@/types/nuxt-api/access-log/http'

/**
 * アクセスログの送信 API
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  consola.level = config.public.logLevel
  const body: AccessLogRequestBody = camelcaseKeys(await readBody(event), { deep: true })

  consola.info(
    JSON.stringify({
      id: getHeader(event, 'x-amzn-trace-id'),
      time: ServerDateUtil.getNow().format(DATE_TIME_YYYYMMDDHHMMSS_COLON),
      'x-forwarded-for': getHeader(event, 'x-forwarded-for'),
      'user-agent': getHeader(event, 'user-agent'),
      ...snakecaseKeys(body, { deep: true })
    })
  )

  setResponseStatus(event, StatusCode.STATUS_CODE_NO_CONTENT)
})
