<script setup lang="ts">
/**
 * エラーをクリアしてユーザーをホームページにリダイレクトする
 */
const handleError = async (): Promise<void> => {
  await clearError()
}
</script>

<template>
  <NuxtLink to="/" @click="handleError">トップページへ</NuxtLink>
</template>
