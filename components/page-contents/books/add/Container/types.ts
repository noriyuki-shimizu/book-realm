import type { User } from 'firebase/auth'

/** Props */
export type Props = {
  /** データの再取得関数 */
  refresh: () => Promise<void>
  /** ユーザーデータ */
  user: User
}
