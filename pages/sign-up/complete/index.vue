<script setup lang="ts">
/** Runtime Config */
const runtimeConfig = useRuntimeConfig()

useHeadSafe(() => {
  const title = '登録完了'
  const description = 'アカウント登録が完了しました！さっそく Book Realm を始めましょう！'
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'og:locale', content: 'ja_JP' },
      { name: 'og:url', content: `${runtimeConfig.public.pageBaseUrl}/sign-up/complete` },
      { name: 'og:image', content: `${runtimeConfig.public.pageBaseUrl}/favicon/favicon-256x256.ico` },
      { name: 'og:site_name', content: 'BOOK Realm' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
    ]
  }
})

definePageMeta({
  auth: false,
  layout: 'simple'
})
</script>

<template>
  <PageContentsSignUpCompleteContainer />
</template>
