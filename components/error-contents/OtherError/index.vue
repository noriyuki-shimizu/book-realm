<script setup lang="ts">
import ContentTemplate from '../ContentTemplate/index.vue'
import type { ErrorProps } from '@/types/core/error'

/** Props */
const props = defineProps<ErrorProps>()
</script>

<template>
  <ContentTemplate :error="props.error">
    <template #status>{{ props.error.statusCode }}</template>
    <template #title>{{ props.error.statusMessage || 'An Error Occurred' }}</template>
    <template #description>
      <p>エラーが発生しました。</p>
    </template>
  </ContentTemplate>
</template>
