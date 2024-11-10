<script setup lang="ts">
/** Runtime Config */
const runtimeConfig = useRuntimeConfig()

useHeadSafe(() => {
  const title = 'アカウント登録'
  const description = '書籍管理のアカウント登録フォームです。メールアドレス・パスワードのみの簡単登録！是非登録して機能をお試し下さい。'
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'og:locale', content: 'ja_JP' },
      { name: 'og:url', content: `${runtimeConfig.public.pageBaseUrl}/sign-up` },
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
  <PageContentsSignUpContainer />
</template>
