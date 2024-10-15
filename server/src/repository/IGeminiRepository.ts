import type { GenerateContentResult } from '@google/generative-ai'

/** Gemini リポジトリ */
export interface IGeminiRepository {
  /**
   * 画像からコンテンツを生成する
   * @param {Buffer} image 画像データ
   * @param {string} mimeType MIME タイプ
   * @returns {Promise<GenerateContentResult>} 生成されたコンテンツ
   */
  findByImage(image: Buffer, mimeType: string): Promise<GenerateContentResult>
}
