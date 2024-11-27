<script setup lang="ts">
import type { User } from 'firebase/auth'
import { useApiStore } from '~/store/page/users/books/managements'

/** Runtime Config */
const runtimeConfig = useRuntimeConfig()

/** API Store */
const apiStore = useApiStore()

/** User */
const user: User | null = await getCurrentUser()

if (LangUtil.isNull(user)) {
  throw createError('Not logged in.')
}

useHeadSafe(() => {
  const title = '書籍一覧'
  const description = '書籍一覧画面です。保存した書籍の確認・編集を行います。'
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'og:locale', content: 'ja_JP' },
      {
        name: 'og:url',
        content: `${runtimeConfig.public.pageBaseUrl}/users/books/managements`
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
  layout: 'client'
})

const { status } = await useLazyAsyncData(async () => {
  await apiStore.getBookAll(user.uid, [])
  return {}
})
</script>

<template>
  <PageContentsUsersBooksManagementsContainer :is-loading="status === 'pending'" />
</template>
