import camelcaseKeys from 'camelcase-keys'
import { LangUtil } from '#shared/utils/core'
import { StatusCode } from '@/enums/common/http/statusCode'
import { UserDetailBookService } from '@/server/src/service/UserDetailBookService'
import { isUserDetailBookDeleteData } from '@/server/src/function/route'

/** 書籍の一括削除 API */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = camelcaseKeys(await readBody(event), { deep: true })

  if (LangUtil.isUndefined(id)) {
    throw createError({
      statusCode: StatusCode.STATUS_CODE_BAD_REQUEST,
      statusMessage: 'User ID is invalid.'
    })
  }
  if (!isUserDetailBookDeleteData(body)) {
    throw createError({
      statusCode: StatusCode.STATUS_CODE_BAD_REQUEST,
      statusMessage: 'Request data is invalid.'
    })
  }

  try {
    const service = UserDetailBookService.of()
    const result = await service.management(id, body, 'DELETE')
    setResponseStatus(event, result.statusCode)
    return result.message
  } catch (err) {
    if (err instanceof Error) {
      const { name, message, cause, stack } = err
      throw createError({
        name,
        message,
        cause,
        stack,
        statusCode: StatusCode.STATUS_CODE_BAD_REQUEST,
        data: null
      })
    }

    throw err
  }
})
