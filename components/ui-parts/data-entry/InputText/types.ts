/** Props */
export type Props = {
  /** ID */
  id: string
  /** Name */
  name: string
  /** Size */
  size?: 'small' | 'medium' | 'large'
  /** Type */
  type?: 'text' | 'email' | 'password'
  /** 必須か */
  required?: boolean
  /** Placeholder */
  placeholder?: string
  /** エラーか */
  isError?: boolean
  /** Aria Described By */
  ariaDescribedby?: string
}
