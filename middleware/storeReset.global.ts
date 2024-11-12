import type { StoreDefinition } from 'pinia'
import { API_STORE_INDEX_FILE_PATH, UI_STORE_INDEX_FILE_PATH } from '@/constants/store/path'

/**
 * API / UI Store のリセットを行う
 */
export default defineNuxtRouteMiddleware(() => {
  const moduleGlob = import.meta.glob<
    true,
    string,
    { default: StoreDefinition }
  >(
    ['../store/**/*.ts'],
    { eager: true }
  )

  const targetStorePaths = Object.keys(moduleGlob)
    .filter((modulePath) => {
      return modulePath.includes(API_STORE_INDEX_FILE_PATH)
        || modulePath.includes(UI_STORE_INDEX_FILE_PATH)
    })

  for (const targetStorePath of targetStorePaths) {
    const targetStore = moduleGlob[targetStorePath].default()
    targetStore.$reset()
  }
})
