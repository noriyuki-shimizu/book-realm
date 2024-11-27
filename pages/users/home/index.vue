<script setup lang="ts">
/** Runtime Config */
const runtimeConfig = useRuntimeConfig()

useHeadSafe(() => {
  const title = 'マイページ'
  const description = '書籍管理のマイページです。登録書籍の一覧や登録情報の確認ができます。'
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'og:locale', content: 'ja_JP' },
      { name: 'og:url', content: `${runtimeConfig.public.pageBaseUrl}/users/home` },
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
</script>

<template>
  <h1>マイページ</h1>
</template>
