<script setup lang="ts">
import ContentTemplate from '../ContentTemplate/index.vue'
import { StatusCode } from '@/enums/common/http/statusCode'
import type { ErrorProps } from '@/types/core/error'

/** Props */
const props = defineProps<ErrorProps>()
</script>

<template>
  <ContentTemplate :error="props.error">
    <template #status>{{ StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR }}</template>
    <template #title>Internal Server Error</template>
    <template #description>
      <p>アクセスしようとしたページは表示できませんでした。</p>
    </template>
  </ContentTemplate>
</template>
