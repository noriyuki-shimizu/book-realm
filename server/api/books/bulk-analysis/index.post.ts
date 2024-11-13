import { consola } from 'consola'
import { LangUtil } from '#shared/utils/core'
import { StatusCode } from '@/enums/common/http/statusCode'
import { BookBulkAnalysisService } from '@/server/src/service/BookBulkAnalysisService'
import type { BookBulkAnalysisPostResponse } from '@/types/nuxt-api/books/bulk-analysis'

/** 本の一括分析 API */
export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event)

  if (LangUtil.isUndefined(data)) {
    throw createError({
      statusCode: StatusCode.STATUS_CODE_BAD_REQUEST,
      statusMessage: 'Request data is empty.'
    })
  }

  const config = useRuntimeConfig()
  consola.level = config.public.logLevel

  try {
    const service = BookBulkAnalysisService.of()
    const resultDataList: BookBulkAnalysisPostResponse = await service.analyze(
      data
    )

    consola.info('guest book bulk analysis result: ', resultDataList)

    if (LangUtil.isEmpty(resultDataList)) {
      setResponseStatus(event, StatusCode.STATUS_CODE_NO_CONTENT)
    } else {
      setResponseStatus(event, StatusCode.STATUS_CODE_OK)
    }
    return resultDataList
  } catch (err) {
    if (err instanceof Error) {
      const { name, message, cause, stack } = err
      const statusCode = StatusCode.STATUS_CODE_BAD_REQUEST
      throw createError({
        name,
        message,
        cause,
        stack,
        statusCode,
        data: null
      })
    }

    throw err
  }
})
