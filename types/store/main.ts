/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * ストアの状態を表す型。キーと値のペアのレコード。
 */
export type State = Record<string, any>

/**
 * 与えられた状態に対するゲッター関数のレコードを表す型。
 * 各ゲッター関数は状態を引数として受け取り、キーと値のペアのレコードを返す。
 *
 * @template S - 状態の型。
 */
export type CreateGetter<S extends State> = {
  [key: string]: (state: S) => Record<string, any> | null
}

/**
 * 計算されたゲッターのツリーを表す型。
 * ツリー内の各キーは、対応するゲッター関数の戻り値の計算された参照に対応する。
 *
 * @template S - 状態の型。
 * @template CG - ゲッター関数の型。
 */
export type GetterTree<S extends State, CG extends CreateGetter<S>> = {
  [K in keyof CG]: ComputedRef<ReturnType<CG[K]>>
}

/**
 * 与えられた状態に対して作成できるメソッドを表す型。
 * メソッドは任意の数の引数を取り、void または void を解決する Promise を返すことができる。
 *
 * @template S - 状態の型。
 * @template Args - 引数の型。
 */
export type CreateMethod<S extends State, Args extends any[] = any[]> = (this: S, ...args: Args) => void | Promise<void>

/**
 * 任意の数の引数を取り、void または void を解決する Promise を返すことができるメソッドを表す型。
 *
 * @template Args - 引数の型。
 */
export type Method<Args extends any[] = any[]> = (...args: Args) => void | Promise<void>

/**
 * 与えられた状態に対するアクションメソッドのレコードを表す型。
 * 各アクションメソッドは任意の数の引数を取り、void または void を解決する Promise を返すことができる。
 *
 * @template S - 状態の型。
 */
export type CreateAction<S extends State> = {
  [key: string]: CreateMethod<S>
}

/**
 * アクションのツリーを表す型。
 * ツリー内の各キーは、対応するアクションメソッドと同じ引数を取るメソッドに対応する。
 *
 * @template S - 状態の型。
 * @template CA - アクションメソッドの型。
 */
export type ActionTree<S extends State, CA extends CreateAction<S>> = {
  [K in keyof CA]: Method<Parameters<CA[K]>>
}

/**
 * 作成するストアの構造を表す型。
 *
 * @template S - 状態の型。
 * @template G - ゲッター関数の型。
 * @template A - アクションメソッドの型。
 */
export type CreateStore<
  S extends State,
  G = CreateGetter<S>,
  A = CreateAction<S>
> = {
  state: S
  getters: G
  actions: A
}

/**
 * ストアの構造を表す型。
 *
 * @template S - 状態の型。
 * @template CG - ゲッター関数の型。
 * @template CA - アクションメソッドの型。
 * @template G - ゲッターツリーの型。
 * @template A - アクションツリーの型。
 */
export type Store<
  S extends State,
  CG extends CreateGetter<S>,
  CA extends CreateAction<S>,
  G extends GetterTree<S, CG> = GetterTree<S, CG>,
  A extends ActionTree<S, CA> = ActionTree<S, CA>
> = () => {
  getters: G
  actions: A
  $debug: () => void
  $reset: () => void
}

export {}
