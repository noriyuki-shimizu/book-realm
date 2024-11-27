import imageCompression from 'browser-image-compression'
import type { FormData, FormValidation, UiState } from './types'
import { FormStateAuthor, FormStatePrice, FormStatePublishedDate, FormStatePublisher, FormStateTitle } from './enums'
import { INITIALIZE_FORM_DATA } from './constants'
import type { UserDetailPostData } from '@/enums/nuxt-api/users/[id]/books'
import { LangUtil } from '#shared/utils/core'
import { IMAGE_COMPRESSION_OPTIONS } from '@/constants/business/image/option'
import {
  AUTHOR_AREA_LABEL_ID,
  PRICE_AREA_LABEL_ID,
  PUBLISHED_DATE_AREA_LABEL_ID,
  PUBLISHER_AREA_LABEL_ID,
  TITLE_AREA_LABEL_ID
} from '@/constants/components/form/book'

/**
 * トップページの UI Store を返す
 * @returns トップページの UI Store
 */
export const useUiStore = defineStore('page-ui-books-add-store', {
  state: (): UiState => {
    return {
      files: null,
      formData: [structuredClone(INITIALIZE_FORM_DATA)]
    }
  },
  getters: {
    isInvalid(state): boolean {
      return state.formData.some((data) => {
        const { title, author, price, publisher, publishedDate } = data.validation
        return [title, author, price, publisher, publishedDate].some((v) => {
          return v?.success === false
        })
      })
    },
    invalidFormItemIds(state): string[] {
      return state.formData.reduce<string[]>((acc, data, index) => {
        const fields: (keyof FormValidation)[] = ['title', 'author', 'price', 'publisher', 'publishedDate']
        const invalidItemIds = fields.reduce<string[]>((ids, field) => {
          if (data.validation[field]?.success === false) {
            switch (field) {
              case 'title':
                ids.push(`${TITLE_AREA_LABEL_ID}-${index}`)
                break
              case 'author':
                ids.push(`${AUTHOR_AREA_LABEL_ID}-${index}`)
                break
              case 'price':
                ids.push(`${PRICE_AREA_LABEL_ID}-${index}`)
                break
              case 'publisher':
                ids.push(`${PUBLISHER_AREA_LABEL_ID}-${index}`)
                break
              case 'publishedDate':
                ids.push(`${PUBLISHED_DATE_AREA_LABEL_ID}-${index}`)
                break
            }
          }
          return ids
        }, [])
        return [...acc, ...invalidItemIds]
      }, [])
    }
  },
  actions: {
    /**
     * ファイル配列をセットする
     * @param {File[] | null} files - ファイル配列
     */
    async setFiles(files: File[] | null): Promise<void> {
      if (LangUtil.isNull(files)) {
        this.files = null
        return
      }

      this.files = (
        await Promise.all(files.map((file) => {
          try {
            return imageCompression(file, IMAGE_COMPRESSION_OPTIONS)
          } catch (error) {
            console.error('Error compressing file:', error)
            return null
          }
        }))
      ).filter((f) => {
        return !LangUtil.isNull(f)
      })
    },
    /**
     * フォームのステートをセットする
     */
    resetFormState(): void {
      this.formData = [structuredClone(INITIALIZE_FORM_DATA)]
    },
    /**
     * フォームのレコードを追加する
     */
    addFormStateRecord(): void {
      this.formData.push(structuredClone(INITIALIZE_FORM_DATA))
    },
    /**
     * フォームのレコードを削除する
     * @param {number} index - 削除するフォームのインデックス
     */
    removeFormStateRecord(index: number): void {
      if (this.formData.length === 1) {
        return
      }
      this.formData.splice(index, 1)
    },
    /**
     * フォームのステートを一括セットする
     * @param {UserDetailPostData[] | null} formStateList - フォームのステート
     */
    updateFormStateList(formStateList: UserDetailPostData[] | null): void {
      if (LangUtil.isNull(formStateList)) {
        this.formData = [structuredClone(INITIALIZE_FORM_DATA)]
        return
      }
      const isCurrentFormValueEmpty = this.formData.some((data) => {
        const { title, author, price, publisher, publishedDate } = data.state
        return [title, author, price, publisher, publishedDate].every(LangUtil.isEmpty)
      })
      const formStateValue = formStateList.map<FormData>((state) => {
        return {
          state,
          validation: { title: null, author: null, price: null, publisher: null, publishedDate: null }
        }
      })

      if (isCurrentFormValueEmpty) {
        this.formData = formStateValue
      } else {
        this.formData.push(...formStateValue)
      }
    },
    /**
     * 送信前のバリデーションエラーをチェックする
     */
    checkPreSubmitInvalidParam(): void {
      this.formData = this.formData.map<FormData>((data) => {
        const { state } = data
        return {
          state,
          validation: {
            title: FormStateTitle.safeParse(state),
            author: FormStateAuthor.safeParse(state),
            price: FormStatePrice.safeParse(state),
            publisher: FormStatePublisher.safeParse(state),
            publishedDate: FormStatePublishedDate.safeParse(state)
          }
        }
      })
    }
  }
})

export default useUiStore
