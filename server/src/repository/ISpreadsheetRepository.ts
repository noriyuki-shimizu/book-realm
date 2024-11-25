import type { UserDetailBookGetResponse, UserDetailBookPostData, UserDetailBookPostResponse } from '@/types/nuxt-api/users/[id]/books'
import type { UserDetailBookKey } from '@/enums/nuxt-api/users/[id]/books'

/** Gemini リポジトリ */
export interface ISpreadsheetRepository {
  /**
   * 書籍一覧取得
   * @param {string} userId ユーザー ID
   * @param {UserDetailBookKey[]} keys 取得キー optional
   * @returns {Promise<UserDetailBookGetResponse>} 書籍一覧取得レスポンス
   */
  findAll(userId: string, keys?: UserDetailBookKey[]): Promise<UserDetailBookGetResponse>
  /**
   * 書籍の一括登録
   * @param {string} userId ユーザー ID
   * @param {UserDetailBookPostData[]} data 保存データ一覧
   */
  saveAll(userId: string, data: UserDetailBookPostData[]): Promise<UserDetailBookPostResponse>
}
