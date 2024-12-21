import snakecaseKeys from 'snakecase-keys'
import type { ISpreadsheetRepository } from '../ISpreadsheetRepository'
import type {
  UserDetailBookDeleteData,
  UserDetailBookGetResponse,
  UserDetailBookPostData,
  UserDetailBookPostResponse
} from '@/types/nuxt-api/users/[id]/books'
import type { UserDetailBookKey } from '@/enums/nuxt-api/users/[id]/books'

/** Gemini リポジトリ */
export class SpreadsheetRepository implements ISpreadsheetRepository {
  /** API Base URL */
  private readonly API_BASE_URL = 'https://script.google.com/macros/s'

  /** インスタンス */
  private static readonly instance: ISpreadsheetRepository = new SpreadsheetRepository()

  /**
   * コンストラクタ
   */
  private constructor() {}

  /**
   * インスタンス生成
   * @returns {GeminiRepository} Gemini リポジトリ
   */
  public static getInstance(): ISpreadsheetRepository {
    return this.instance
  }

  public async findAll(userId: string, keys?: UserDetailBookKey[]): Promise<UserDetailBookGetResponse> {
    return $fetch<UserDetailBookGetResponse>(
      `${this.API_BASE_URL}/AKfycbyPWsH4xrnoOWlzgSCnPN7EoDQvxXoBbR4vh2RNMVHdM-pMeXw7DtXG6-OVA7b-IQco/exec`,
      { query: snakecaseKeys({ userId, keys }) }
    )
  }

  public async management(
    userId: string,
    data: UserDetailBookPostData[] | UserDetailBookDeleteData,
    action: 'POST' | 'PUT' | 'DELETE'
  ): Promise<UserDetailBookPostResponse> {
    return $fetch<UserDetailBookPostResponse>(
      `${this.API_BASE_URL}/AKfycbzoBjhe4ERPEqW185lL5L1luRE1D7O33Y-zY1BjSjsfjaB5tQ2oOgQ9rW5O2tOwMdyh/exec`,
      { method: 'POST', body: snakecaseKeys({ userId, data, action }) }
    )
  }
}
