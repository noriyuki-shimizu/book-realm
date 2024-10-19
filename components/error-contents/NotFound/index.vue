<script setup lang="ts">
import ContentTemplate from '../ContentTemplate/index.vue'
import { StatusCode } from '@/enums/common/http/statusCode'
import type { ErrorProps } from '@/types/core/error'

/** Props */
const props = defineProps<ErrorProps>()
</script>

<template>
  <ContentTemplate :error="props.error">
    <template #status>{{ StatusCode.STATUS_CODE_NOT_FOUND }}</template>
    <template #title>Not Found</template>
    <template #description>
      <p>
        お探しのページが見つかりませんでした。<br />
        URL が間違っているか、ページが削除された可能性があります。
      </p>
    </template>
  </ContentTemplate>
</template>
