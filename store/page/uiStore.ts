import imageCompression from 'browser-image-compression'
import type { Options } from 'browser-image-compression'
import type { UiState } from './types'

/**
 * トップページの UI Store を返す
 * @returns トップページの UI Store
 */
export const useUiStore = () => {
  /** State */
  const _state = useState<UiState>('page-ui-top-store', () => {
    return {
      files: null
    }
  })

  /** Getters */
  const getters = {
    /** ファイル */
    files: computed<File[] | null>(() => {
      return _state.value.files
    })
  }

  /** Actions */
  const actions = {
    /**
     * ファイルを設定
     * @param files ファイル配列
     */
    setFiles: async (files: File[] | null): Promise<void> => {
      if (LangUtil.isNull(files)) {
        _state.value.files = null
        return
      }

      const options: Options = {
        maxSizeMB: 4.5,
        useWebWorker: true
      }
      _state.value.files = (
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

  return {
    ...getters,
    ...actions
  }
}
