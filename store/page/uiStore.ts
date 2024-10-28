import imageCompression from 'browser-image-compression'
import type { Options } from 'browser-image-compression'
import type { UiActions, UiGetters, UiState } from './types'
import { defineStore } from '@/store/main'

/**
 * トップページの UI Store を返す
 * @returns トップページの UI Store
 */
export const useUiStore = defineStore<UiState, UiGetters, UiActions>('page-ui-top-store', () => {
  return {
    state: {
      files: null
    },
    getters: {
      files(state) {
        return state.files
      }
    },
    actions: {
      async setFiles(files: File[] | null) {
        if (LangUtil.isNull(files)) {
          this.files = null
          return
        }

        const options: Options = {
          maxSizeMB: 4.5,
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
  }
})
