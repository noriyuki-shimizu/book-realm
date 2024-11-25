/** Props */
export type Props = {
  /**
   * ファイル配列の変更時のコールバック
   * @param {File[] | null} value ファイル配列
   */
  onChange: (value: File[] | null) => Promise<void>
  /**
   * 実行時のコールバック
   * @param {FormData} value フォームデータ
   */
  onSubmit: (value: FormData) => Promise<void>
}
