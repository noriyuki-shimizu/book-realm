<script setup lang="ts">
import { MAIN_HEAD_LINK } from '@/constants/components/head/link'

/** Loading Indicator */
const { isLoading } = useLoadingIndicator()

useHead({
  link: MAIN_HEAD_LINK,
})
</script>

<template>
  <NuxtLayout>
    <LayoutContentsSpinnerWrapper v-show="isLoading" />
    <div v-show="!isLoading">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>
