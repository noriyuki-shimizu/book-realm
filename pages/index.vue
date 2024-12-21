<script setup lang="ts">
import type { User } from 'firebase/auth'
import { callWithNuxt } from '#app'
import { LangUtil } from '#shared/utils/core'
import { useApiStore } from '@/store/page'

/** Runtime Config */
const runtimeConfig = useRuntimeConfig()

useHeadSafe(() => {
  const title = 'トップページ'
  const description = 'あなただけの書籍管理ができます。機能をお試しいただき、よければログインしてご利用ください。'
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'og:locale', content: 'ja_JP' },
      { name: 'og:url', content: runtimeConfig.public.pageBaseUrl },
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
  auth: false,
  layout: 'guest',
  middleware: [
    async () => {
      const nuxtApp = useNuxtApp()
      const user: User | null = await getCurrentUser()
      if (!LangUtil.isNull(user)) {
        return callWithNuxt(nuxtApp, navigateTo, ['/users/home'])
      }
    },
    (to) => {
      const apiStore = useApiStore()
      if (!LangUtil.isEmpty(to.hash) && LangUtil.isNull(apiStore.bookBulkAnalysisPostResponse)) {
        return navigateTo({ path: to.path, hash: '' })
      }
    }
  ]
})
</script>

<template>
  <PageContentsTopContainer />
</template>
