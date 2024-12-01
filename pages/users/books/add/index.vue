<script setup lang="ts">
import type { User } from 'firebase/auth'
import { useUiStore, useApiStore } from '@/store/page/users/books/add'
import { LangUtil } from '#shared/utils/core'

/** Runtime Config */
const runtimeConfig = useRuntimeConfig()

/** Firebase Auth User */
const user: User | null = await getCurrentUser()

if (LangUtil.isNull(user)) {
  throw createError('Not logged in.')
}

/** API Store */
const apiStore = useApiStore()

useHeadSafe(() => {
  const title = '書籍登録'
  const description = '書籍登録画面です。登録したい書籍を入力してください。'
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'og:locale', content: 'ja_JP' },
      {
        name: 'og:url',
        content: `${runtimeConfig.public.pageBaseUrl}/users/books/add`
      },
      {
        name: 'og:image',
        content: `${runtimeConfig.public.pageBaseUrl}/favicon/favicon-256x256.ico`
      },
      { name: 'og:site_name', content: 'BOOK Realm' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description }
    ]
  }
})

definePageMeta({
  layout: 'client',
  middleware: [
    (to) => {
      const apiStore = useApiStore()
      if (!LangUtil.isEmpty(to.hash) && LangUtil.isNull(apiStore.bookBulkAnalysisPostResponse)) {
        return navigateTo({ path: to.path, hash: '' })
      }
    },
    () => {
      const apiStore = useApiStore()
      const uiStore = useUiStore()
      apiStore.$reset()
      uiStore.$reset()
    }
  ]
})

/** Async Data */
await useAsyncData(async () => {
  await apiStore.getBookAll(user.uid, ['title'])
  return {}
})
</script>

<template>
  <PageContentsUsersBooksAddContainer />
</template>
