import type { UiState } from './types'

/**
 * トップページの UI Store を返す
 * @returns トップページの UI Store
 */
export const useUiStore = () => {
  /** State */
  const _state = useState<UiState>('page-ui-top-store', () => {
    return {
      file: null
    }
  })

  /** Getters */
  const getters = {
    /** ファイル */
    file: computed<FileList | null>(() => {
      return _state.value.file
    })
  }

  /** Actions */
  const actions = {
    /**
     * ファイルを設定
     * @param file ファイル
     */
    setFile: (file: FileList | null): void => {
      _state.value.file = file
    }
  }

  return {
    ...getters,
    ...actions
  }
}
