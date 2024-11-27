import type z from 'zod'
import { UserDetailBookKey, UserDetailPostData } from '@/enums/nuxt-api/users/[id]/books'

/** 本のタイトルのバリデーション設定 */
export const FormStateTitle = UserDetailPostData.pick({ [UserDetailBookKey.title]: true })

/** 本のタイトルのバリデーション型 */
export type FormStateTitle = z.infer<typeof FormStateTitle>

/** 著者名のバリデーション設定 */
export const FormStateAuthor = UserDetailPostData.pick({ [UserDetailBookKey.author]: true })

/** 著者名のバリデーション型 */
export type FormStateAuthor = z.infer<typeof FormStateAuthor>

/** 価格のバリデーション設定 */
export const FormStatePrice = UserDetailPostData.pick({ [UserDetailBookKey.price]: true })

/** 価格のバリデーション型 */
export type FormStatePrice = z.infer<typeof FormStatePrice>

/** 出版社名のバリデーション設定 */
export const FormStatePublisher = UserDetailPostData.pick({ [UserDetailBookKey.publisher]: true })

/** 出版社名のバリデーション型 */
export type FormStatePublisher = z.infer<typeof FormStatePublisher>

/** 出版年月日のバリデーション設定 */
export const FormStatePublishedDate = UserDetailPostData.pick({ [UserDetailBookKey.publishedDate]: true })

/** 出版年月日のバリデーション型 */
export type FormStatePublishedDate = z.infer<typeof FormStatePublishedDate>
