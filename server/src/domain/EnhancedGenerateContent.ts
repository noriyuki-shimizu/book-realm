import type { EnhancedGenerateContentResponse } from '@google/generative-ai'

/** 生成されたコンテンツの拡張クラス */
export class EnhancedGenerateContent {
  /** 生成されたコンテンツ */
  private readonly value: EnhancedGenerateContentResponse

  /**
   * コンストラクタ
   * @param {EnhancedGenerateContentResponse} value 生成されたコンテンツ
   */
  private constructor(value: EnhancedGenerateContentResponse) {
    this.value = value
  }

  /**
   * インスタンス生成
   * @param {EnhancedGenerateContentResponse} value 生成されたコンテンツ
   * @returns {EnhancedGenerateContent} インスタンス
   */
  public static of(value: EnhancedGenerateContentResponse): EnhancedGenerateContent {
    return new EnhancedGenerateContent(value)
  }

  /**
   * JSON を文字列から抽出する
   * @returns {string} JSON 文字列
   */
  public extractJsonFromString(): string {
    const textContent = this.value.text()
    const jsonStartIndex = textContent.indexOf('[')
    const jsonEndIndex = textContent.lastIndexOf(']') + 1

    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
      throw new Error('JSON not found in the textContent string')
    }

    return textContent.substring(jsonStartIndex, jsonEndIndex)
  }
}
