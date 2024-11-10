import imageCompression from 'browser-image-compression'
import type { Options } from 'browser-image-compression'
import type { UiState } from './types'
import { LangUtil } from '#shared/utils/core'

/**
 * トップページの UI Store を返す
 * @returns トップページの UI Store
 */
export const useUiStore = defineStore('page-ui-top-store', {
  state: (): UiState => {
    return {
      files: null
    }
  },
  getters: {},
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

      const options: Options = {
        maxSizeMB: 5,
        useWebWorker: true
      }
      this.files = (
        await Promise.all(files.map((file) => {
          try {
            return imageCompression(file, options)
          } catch (error) {
            console.error('Error compressing file:', error)
            return null
          }
        }))
      ).filter((f) => {
        return !LangUtil.isNull(f)
      })
    }
  }
})

export default useUiStore
