<script setup lang="ts">
/** Runtime Config */
const runtimeConfig = useRuntimeConfig()

useHeadSafe(() => {
  const title = 'パスワード再設定完了'
  const description = 'パスワード再設定が完了しました！新しいパスワードでログインしてください。'
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'og:locale', content: 'ja_JP' },
      {
        name: 'og:url',
        content: `${runtimeConfig.public.pageBaseUrl}/forgot-password/complete`
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
  layout: 'simple'
})
</script>

<template>
  <PageContentsForgotPasswordCompleteContainer />
</template>
