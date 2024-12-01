<script setup lang="ts">
import { useCommonAuthApiStore } from '@/store/common/auth'
import { useUiStore } from '@/store/page/sign-in'

/** Runtime Config */
const runtimeConfig = useRuntimeConfig()

useHeadSafe(() => {
  const title = 'ログイン'
  const description = '書籍管理のログインフォームです。ログインしてあなただけの書籍管理を行ってください。'
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'og:locale', content: 'ja_JP' },
      {
        name: 'og:url',
        content: `${runtimeConfig.public.pageBaseUrl}/sign-in`
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
  auth: false,
  layout: 'simple',
  middleware: [
    (to, from) => {
      if (to.path === from.path) {
        return
      }
      const commonAuthApiStore = useCommonAuthApiStore()
      const uiStore = useUiStore()
      commonAuthApiStore.$reset()
      uiStore.$reset()
    }
  ]
})
</script>

<template>
  <PageContentsSignInContainer />
</template>
