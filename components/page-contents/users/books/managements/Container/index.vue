<script setup lang="ts">
import type { User } from 'firebase/auth'
import SkeletonTable from '../SkeletonTable/index.vue'
import SkeletonList from '../SkeletonList/index.vue'
import EmptySection from '../EmptySection/index.vue'
import BookTable from '../BookTable/index.vue'
import BookList from '../BookList/index.vue'
import type { Props } from './types'
import { useApiStore as useBookManagementApiStore } from '@/store/page/users/books/managements'
import type { BookListViewData } from '@/types/business/book/viewData'
import { LangUtil, DateUtil } from '#shared/utils/core'
import { useApiStore as useBookAddApiStore } from '@/store/page/users/books/add'
import { StatusCode } from '@/enums/common/http/statusCode'

/** Props */
const props = defineProps<Props>()

/** Emits */
const emit = defineEmits<{
  (e: 'refreshBookFetch'): void
}>()

/** Book Management API Store */
const bookManagementApiStore = useBookManagementApiStore()

/** Book Add API Store */
const bookAddApiStore = useBookAddApiStore()

/** User */
const user: User | null = await getCurrentUser()

if (LangUtil.isNull(user)) {
  throw createError('Not logged in.')
}

/** CSS Module */
const cssModule = useCssModule('classes')

/** API Store Reactive Param */
const { userDetailBookGetResponse } = storeToRefs(bookManagementApiStore)

/** View Data */
const viewData = computed<BookListViewData[]>(() => {
  const data = userDetailBookGetResponse.value?.data
  if (LangUtil.isNil(data)) {
    return []
  }
  return data.map((d) => {
    const { id, title, author, price, publisher, publishedDate, createdAt, updatedAt } = d
    return {
      id,
      title,
      author,
      price,
      publisher,
      publishedDate: LangUtil.isEmpty(publishedDate) ? null : DateUtil.parseDotSeparatedDate(publishedDate),
      createdAt: LangUtil.isEmpty(createdAt) ? null : DateUtil.parseDotSeparatedDate(createdAt),
      updatedAt: LangUtil.isEmpty(updatedAt) ? null : DateUtil.parseDotSeparatedDate(updatedAt)
    }
  })
})

/**
 * 書籍登録画面へ遷移する
 */
const toAddBooks = async (): Promise<void> => {
  await navigateTo('/users/books/add')
}
</script>

<template>
  <div :class="cssModule['container']">
    <div :class="cssModule['container__title-container']">
      <h1 :class="cssModule['container__title']">書籍一覧</h1>
      <UiPartsGeneralBasicButton type="button" color="primary" @click="toAddBooks">登録する</UiPartsGeneralBasicButton>
    </div>
    <template v-if="bookManagementApiStore.userDetailBookDeleteResponse?.status === StatusCode.STATUS_CODE_CREATED">
      <UiPartsFeedbackAlert :class="cssModule['container__alert-text']" type="success" aria-live="assertive">
        書籍の削除が完了しました。
      </UiPartsFeedbackAlert>
    </template>
    <template v-if="bookAddApiStore.userDetailBookPostResponse?.status === StatusCode.STATUS_CODE_CREATED">
      <UiPartsFeedbackAlert :class="cssModule['container__alert-text']" type="success" aria-live="assertive">
        書籍の登録が完了しました。
      </UiPartsFeedbackAlert>
    </template>
    <template v-if="props.isLoading">
      <SkeletonTable :class="cssModule['container__skeleton-table']" />
      <SkeletonList :class="cssModule['container__skeleton-list']" />
    </template>
    <template
      v-else-if="
        LangUtil.isNil(userDetailBookGetResponse) ||
        (!LangUtil.isNil(userDetailBookGetResponse) && LangUtil.isEmpty(userDetailBookGetResponse.data)) ||
        LangUtil.isNull(userDetailBookGetResponse.data)
      "
    >
      <EmptySection />
    </template>
    <template v-else>
      <BookTable :class="cssModule['container__table']" :data="viewData" @refresh-book-fetch="emit('refreshBookFetch')" />
      <BookList :class="cssModule['container__list']" :data="viewData" @refresh-book-fetch="emit('refreshBookFetch')" />
    </template>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
