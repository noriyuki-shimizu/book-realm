import type { ISpreadsheetRepository } from '../repository/ISpreadsheetRepository'
import { SpreadsheetRepository } from '../repository/imp/SpreadsheetRepository'
import { isUserDetailBookKey, isUserDetailBookKeyList } from '../function/route'
import type { UserDetailBookGetResponse, UserDetailBookPostData, UserDetailBookPostResponse } from '@/types/nuxt-api/users/[id]/books'
import type { UserDetailBookKey } from '@/enums/nuxt-api/users/[id]/books'

/** 本の一括解析におけるサービス */
export class UserDetailBookService {
  /** Gemini Repository */
  private readonly repository: ISpreadsheetRepository

  /**
   * コンストラクタ
   */
  private constructor() {
    this.repository = SpreadsheetRepository.getInstance()
  }

  /**
   * インスタンス生成
   * @returns {BookBulkAnalysisService} 本の一括解析サービス
   */
  public static of(): UserDetailBookService {
    return new UserDetailBookService()
  }

  /**
   * 書籍一覧取得
   * @param {string} userId ユーザー ID
   * @returns {Promise<UserDetailBookGetResponse>} 本の一括解析結果
   */
  public async getAll(userId: string, keys?: UserDetailBookKey[]): Promise<UserDetailBookGetResponse> {
    if (isUserDetailBookKeyList(keys)) {
      return this.repository.findAll(userId, keys)
    } else if (isUserDetailBookKey(keys)) {
      return this.repository.findAll(userId, [keys])
    }
    return this.repository.findAll(userId)
  }

  /**
   * 書籍の一括登録
   * @param {string} userId ユーザー ID
   * @param {UserDetailBookPostData[]} data 保存データ一覧
   * @returns {Promise<UserDetailBookPostResponse>} 書籍の一括登録レスポンス
   */
  public async saveAll(userId: string, data: UserDetailBookPostData[]): Promise<UserDetailBookPostResponse> {
    return this.repository.saveAll(userId, data)
  }
}
