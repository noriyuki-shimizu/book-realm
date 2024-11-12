import { GoogleGenerativeAI } from '@google/generative-ai'
import type { GenerateContentResult, GenerativeModel } from '@google/generative-ai'
import type { IGeminiRepository } from '../IGeminiRepository'

/** Gemini リポジトリ */
export class GeminiRepository implements IGeminiRepository {
  /** インスタンス */
  private static readonly instance: GeminiRepository = new GeminiRepository()

  /** Gemini Repository */
  private repository: GenerativeModel

  /**
   * コンストラクタ
   */
  private constructor() {
    const runtimeConfig = useRuntimeConfig()
    const genAI = new GoogleGenerativeAI(runtimeConfig.googleAiStudioApiKey)
    this.repository = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    // this.repository = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  }

  /**
   * インスタンス生成
   * @returns {GeminiRepository} Gemini リポジトリ
   */
  public static getInstance(): GeminiRepository {
    return this.instance
  }

  public async findByImage(
    image: Buffer,
    mimeType: string
  ): Promise<GenerateContentResult> {
    const prompt = `
      こちらの写真にある本のタイトルを1冊1冊正しく抜き取ってください。
      情報は下記の JSON 形式で出力してください。

      {
        "uid": "ユニークID（型: string）"
        "title": "本のタイトル（型: string）",
        "author": "著者名（型: string）",
        "price": "価格 (型: number)",
        "publisher": "出版社名（型: string）",
        "publishedDate": "出版年月日 (型: string, フォーマット: YYYY.MM.DD)",
      }

      上記の JSON 形式において、足りない情報はタイトルから情報を収集して埋めてください。
      ユニークIDは他の情報と重複しないようにしてください。
      情報収集では https://www.amazon.co.jp/ を利用してください。
    `
    const imageOption = {
      inlineData: {
        data: image.toString('base64'),
        mimeType
      }
    }

    return this.repository.generateContent([prompt, imageOption])
  }
}
