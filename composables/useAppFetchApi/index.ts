import type { State } from './types'

/**
 * submit 実行に関する状態と処理の使用
 * @param handler submit 実行における処理
 * @returns submit 実行に関する状態と処理
 */
export const useAppFetchApi = <T = unknown>(handler: () => Promise<T>) => {
  const state = reactive<State>({
    pending: false
  })

  /**
   * handler 実行関数
   * @returns handler 関数の返り値
   */
  const execute = (): Promise<T | null> => {
    state.pending = true

    return handler().finally(() => {
      state.pending = false
    })
  }

  return {
    execute,
    ...toRefs(state)
  }
}
