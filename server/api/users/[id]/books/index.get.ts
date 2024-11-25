import { LangUtil } from '#shared/utils/core'
import { StatusCode } from '@/enums/common/http/statusCode'
import { UserDetailBookService } from '@/server/src/service/UserDetailBookService'
import { isUserDetailBookKeyList } from '@/server/src/function/route'

/** 書籍一覧取得 API */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { keys } = getQuery(event)

  if (LangUtil.isUndefined(id)) {
    throw createError({
      statusCode: StatusCode.STATUS_CODE_BAD_REQUEST,
      statusMessage: 'User ID is invalid.'
    })
  }
  if (Array.isArray(keys) && !LangUtil.isEmpty(keys) && !isUserDetailBookKeyList(keys)) {
    throw createError({
      statusCode: StatusCode.STATUS_CODE_BAD_REQUEST,
      statusMessage: 'Keys is invalid.'
    })
  }

  try {
    const service = UserDetailBookService.of()
    const result = await service.getAll(id, isUserDetailBookKeyList(keys) ? keys : [])
    setResponseStatus(event, result.statusCode)
    return result.data
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
