<script setup lang="ts">
import { MAIN_HEAD_LINK } from '@/constants/components/head/link'
import { getErrorTitle } from '@/functions/component/head/title'
import type { ErrorProps } from '@/types/core/error'

/** Props */
const props = defineProps<ErrorProps>()

/** Runtime Config */
const runtimeConfig = useRuntimeConfig()

/** Route */
const route = useRoute()

useHeadSafe(() => {
  const title = getErrorTitle(props.error.statusCode)
  return {
    title,
    meta: [
      { name: 'og:locale', content: 'ja_JP' },
      { name: 'og:url', content: `${runtimeConfig.public.pageBaseUrl}/${route.path}` },
      { name: 'og:image', content: `${runtimeConfig.public.pageBaseUrl}/favicon/favicon-256x256.ico` },
      { name: 'og:site_name', content: 'BOOK Realm' },
      { property: 'og:title', content: title },
    ]
  }
})

useHead({
  link: MAIN_HEAD_LINK,
})

prerenderRoutes(['/'])
</script>

<template>
  <NuxtLayout>
    <ErrorContentsContainer :error="props.error" />
  </NuxtLayout>
</template>
