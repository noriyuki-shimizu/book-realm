<script setup lang="ts">
import InternalServerError from '../InternalServerError/index.vue'
import NotFound from '../NotFound/index.vue'
import OtherError from '../OtherError/index.vue'
import { StatusCode } from '@/enums/common/http/statusCode'
import type { ErrorProps } from '@/types/core/error'

/** Props */
const props = defineProps<ErrorProps>()
</script>

<template>
  <template v-if="props.error.statusCode === StatusCode.STATUS_CODE_NOT_FOUND">
    <NotFound :error="props.error" />
  </template>
  <template v-else-if="props.error.statusCode === StatusCode.STATUS_CODE_INTERNAL_SERVER_ERROR">
    <InternalServerError :error="props.error" />
  </template>
  <template v-else>
    <OtherError :error="props.error" />
  </template>
</template>
