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
      // bookBulkAnalysisPostResponse: null
      bookBulkAnalysisPostResponse: {
        data: [{
          uid: '1',
          title: '既存のコードを安全に改善するリファクタリング',
          author: 'マーチン・ファウラー',
          price: 10000,
          publisher: 'オーム社',
          publishedDate: '2019.7.19'
        }, {
          uid: '2',
          title: 'はじめてのSpring Boot ―やさしいJavaフレームワークで、改訂版',
          author: '槙 俊行',
          price: 10000,
          publisher: '秀和システム',
          publishedDate: '2021.12.20'
        }, {
          uid: '3',
          title: 'リーダブルコード ―より良いコードを書くためのシンプルで実践的なテクニック',
          author: 'Dustin Boswell',
          price: 10000,
          publisher: 'オライリージャパン',
          publishedDate: '2012.1.3'
        }],
        status: StatusCode.STATUS_CODE_OK,
        error: null
      }
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
