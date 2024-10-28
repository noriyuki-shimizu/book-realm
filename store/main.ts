import type {
  ActionTree,
  CreateAction,
  CreateGetter,
  CreateStore,
  GetterTree,
  Method,
  State,
  Store
} from '@/types/store/main'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stateMap = new Map<string, Ref<any>>()

/**
 * ストアを定義する関数。
 *
 * @template S - 状態の型。
 * @template CG - ゲッター関数の型。
 * @template CA - アクションメソッドの型。
 *
 * @param {string} id - ストアの識別子。
 * @param {() => CreateStore<S, CG, CA>} setup - ストアの初期設定を行う関数。CreateStore 型のオブジェクトを返す。
 * @returns {Store<S, CG, CA>} ストアを使用するための関数。GetterTree と ActionTree を含むオブジェクトを返す。
 */
export const defineStore = <
  S extends State = State,
  CG extends CreateGetter<S> = CreateGetter<S>,
  CA extends CreateAction<S> = CreateAction<S>
>(
  id: string,
  setup: () => CreateStore<S, CG, CA>
): Store<S, CG, CA> => {
  const setupData = setup()
  const stateRef = toRef(setupData.state)
  let state = stateMap.get(id)

  if (LangUtil.isUndefined(state)) {
    state = stateRef as Ref<S>
    stateMap.set(id, state)
  }

  const getters = (Object.keys(setupData.getters) as (keyof CG)[]).reduce((acc, key) => {
    acc[key] = computed(() => {
      return (setupData.getters[key] as CG[typeof key])(state.value) as ReturnType<CG[typeof key]>
    })
    return acc
  }, {} as GetterTree<S, CG>)

  const actions = (Object.keys(setupData.actions) as (keyof CA)[]).reduce((acc, key) => {
    acc[key] = setupData.actions[key].bind(state.value) as Method
    return acc
  }, {} as ActionTree<S, CA>)

  return function useStore() {
    return {
      getters,
      actions,
      $debug() {
        console.dir(setupData.state, { depth: null })
      },
      $reset() {
        const state = stateRef as Ref<S>
        stateMap.set(id, state)
      }
    }
  }
}
