<script setup lang="ts">
useHeadSafe(() => {
  const title = 'トップページ'
  const description = 'あなただけの書籍管理ができます。機能をお試しいただき、よければログインしてご利用ください。'
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:description', content: description },
      {
        property: 'og:title',
        content: title
      }
    ]
  }
})
</script>

<template>
  <PageContentsTopContainer />
</template>
