import type { FormData } from './types'

/** フォームの初期データ */
export const INITIALIZE_FORM_DATA: FormData = {
  state: {
    title: '',
    author: '',
    price: '',
    publisher: '',
    publishedDate: ''
  },
  validation: {
    title: null,
    author: null,
    price: null,
    publisher: null,
    publishedDate: null
  }
}
