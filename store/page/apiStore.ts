import { postRequest } from '@/infrastructures/rest/nuxt/api/books/bulk-analysis'
import { StatusCode } from '@/enums/common/http/statusCode'
import type { ApiState } from './types'
import type { BookBulkAnalysisPostResponse } from '@/types/nuxt-api/books/bulk-analysis'
import type { ApiResponseState } from '@/types/store/response'

/**
 * トップページの API Store を返す
 * @returns トップページの API Store
 */
export const useApiStore = () => {
  /** State */
  const _state = useState<ApiState>('page-api-top-store', () => {
    return {
      bookBulkAnalysisPostResponse: null
    }
  })

  /** Getters */
  const getters = {
    /** 本の一括解析結果 */
    bookBulkAnalysisPostResponse: computed<ApiResponseState<BookBulkAnalysisPostResponse> | null>(() => {
      return _state.value.bookBulkAnalysisPostResponse
    })
  }

  /** Actions */
  const actions = {
    /**
     * 本の一括解析を実行
     * @param data フォームデータ (ファイルデータ)
     */
    postBookBulkAnalysis: async (data: FormData): Promise<void> => {
      _state.value.bookBulkAnalysisPostResponse = null

      try {
        const response = await postRequest(data)
        _state.value.bookBulkAnalysisPostResponse = {
          data: response._data ?? null,
          status: response.status,
          error: null
        }
      } catch (err) {
        const nuxtErr = ErrorUtil.convertNuxtError(err)
        console.log(err)
        _state.value.bookBulkAnalysisPostResponse = {
          data: null,
          status: nuxtErr.statusCode ?? StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR,
          error: nuxtErr
        }
      }
    }
  }

  return {
    ...getters,
    ...actions
  }
}
