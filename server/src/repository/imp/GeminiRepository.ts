import { GoogleGenerativeAI } from '@google/generative-ai'
import type { GenerateContentResult, GenerativeModel } from '@google/generative-ai'
import type { IGeminiRepository } from '../IGeminiRepository'

/** Gemini リポジトリ */
export class GeminiRepository implements IGeminiRepository {
  /** インスタンス */
  private static readonly instance: IGeminiRepository = new GeminiRepository()

  /** Gemini Repository */
  private repository: GenerativeModel

  /**
   * コンストラクタ
   */
  private constructor() {
    const runtimeConfig = useRuntimeConfig()
    const genAI = new GoogleGenerativeAI(runtimeConfig.googleAiStudioApiKey)
    // this.repository = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    this.repository = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    // this.repository = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  }

  /**
   * インスタンス生成
   * @returns {IGeminiRepository} Gemini リポジトリ
   */
  public static getInstance(): IGeminiRepository {
    return this.instance
  }

  public async findByImage(
    image: Buffer,
    mimeType: string
  ): Promise<GenerateContentResult> {
    const prompt = `
      こちらの写真に写っている書籍のタイトルを取得してください。
      タイトルは半角スペースなしで取得してください。
      書籍に写っている文字は全て取得するようにタイトル情報を抜き取ってください。
      タイトルに上巻・下巻や巻数などがある場合、同じタイトルであっても別の書籍情報としてデータを抽出してください。
      タイトル以外のデータは、下記のいずれかのサイトにて取得したタイトルから情報収集してください。
      価格と出版年月日において、サイトごとで情報が異なる場合は、どちらか一方を取得してください。

      - https://books.rakuten.co.jp/
      - https://www.amazon.co.jp/
      - https://www.e-hon.ne.jp/bec/EB/Top
      - https://www.kinokuniya.co.jp/
      - https://www.maruzenjunkudo.co.jp/

      取得情報は以下の形式で返却してください。

      [
        {
          "uid": "ユニークID（型: string）"
          "title": "書籍のタイトル（型: string）",
          "author": "著者名（型: string）",
          "price": "価格 (型: number)",
          "publisher": "出版社名（型: string）",
          "publishedDate": "v (型: string, フォーマット: YYYY.MM.DD)",
        }
      ]

      ユニークIDは他の情報と重複しないようにしてください。
      また、以前と同じ書籍の情報が返却された場合は、以前の情報を上書きしないようにしてください。
      以前に同じ画像を解析した場合も、以前の情報を上書きしないようにしてください。
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
