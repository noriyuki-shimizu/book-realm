import { EnhancedGenerateContent } from '../domain/EnhancedGenerateContent'
import type { IGeminiRepository } from '../repository/IGeminiRepository'
import { GeminiRepository } from '../repository/imp/GeminiRepository'
import type { BookBulkAnalysisPostResponse } from '@/types/nuxt-api/books/bulk-analysis'

/** 本の一括解析におけるサービス */
export class BookBulkAnalysisService {
  /** Gemini Repository */
  private readonly repository: IGeminiRepository

  /**
   * コンストラクタ
   */
  private constructor() {
    this.repository = GeminiRepository.getInstance()
  }

  /**
   * インスタンス生成
   * @returns {BookBulkAnalysisService} 本の一括解析サービス
   */
  public static of(): BookBulkAnalysisService {
    return new BookBulkAnalysisService()
  }

  /**
   * 本の一括解析
   * @param {NonNullable<Awaited<ReturnType<typeof readMultipartFormData>>>} data リクエストデータ
   * @returns {Promise<BookBulkAnalysisPostResponse>} 本の一括解析結果
   */
  public async analyze(
    data: NonNullable<Awaited<ReturnType<typeof readMultipartFormData>>>
  ): Promise<BookBulkAnalysisPostResponse> {
    const resultDataList: BookBulkAnalysisPostResponse = []

    for (const d of data) {
      if (d.name === 'file') {
        const { response } = await this.repository.findByImage(
          d.data,
          d.type ?? 'image/png'
        )
        const enhancedGenerateContent = EnhancedGenerateContent.of(response)
        const resultData = JSON.parse(
          enhancedGenerateContent.extractJsonFromString()
        )
        resultDataList.push(resultData)
      }
    }

    return resultDataList.flat()
  }
}
