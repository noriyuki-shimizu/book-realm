<script setup lang="ts">
/** Runtime Config */
const runtimeConfig = useRuntimeConfig()

useHeadSafe(() => {
  const title = 'パスワード再設定'
  const description = '書籍管理のパスワード再設定画面です。まずメールアドレスを入力し、メールアドレス宛に届いた案内に従って再設定を実施してください。'
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'og:locale', content: 'ja_JP' },
      { name: 'og:url', content: `${runtimeConfig.public.pageBaseUrl}/forgot-password` },
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
  <PageContentsForgotPasswordContainer />
</template>
