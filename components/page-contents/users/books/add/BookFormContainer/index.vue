<script setup lang="ts">
import type { User } from 'firebase/auth'
import BookFormTable from '../BookFormTable/index.vue'
import BookFormList from '../BookFormList/index.vue'
import { useApiStore, useUiStore } from '@/store/page/users/books/add'
import { LangUtil } from '#shared/utils/core'
import { StatusCode } from '@/enums/common/http/statusCode'
import { IMAGE_ANALYSIS_RESULT_HASH_ID } from '@/constants/business/router/hash'
import CirclePlusSolid from '@/assets/svg/circle-plus-solid.svg?component'

/** Firebase Auth User */
const user: User | null = await getCurrentUser()

if (LangUtil.isNull(user)) {
  throw createError('Not logged in.')
}

/** API Store */
const apiStore = useApiStore()

/** CSS Module */
const cssModule = useCssModule('classes')

/** Loading Indicator */
const { start, finish } = useLoadingIndicator()

/** API Store Reactive Param */
const { userDetailBookPostResponse, bookTitles } = storeToRefs(apiStore)

/** UI Store Param */
const uiStore = useUiStore()

/** UI Store Reactive Param */
const { formData, isInvalid, invalidFormItemIds } = storeToRefs(uiStore)

/** モーダルの開閉状態 */
const isModalOpen = ref<boolean>(false)

/** 重複しているタイトルがあるか */
const isDuplicateTitle = computed<boolean>(() => {
  return bookTitles.value.some((title) => {
    return formData.value.some((data) => {
      return data.state.title === title
    })
  })
})

/**
 * 書籍登録ボタンがクリックされた際の処理
 */
const onClickAddBookSubmit = async (): Promise<void> => {
  if (isDuplicateTitle.value) {
    isModalOpen.value = true
    return
  }

  await onAddBooksSubmit()
}

/**
 * 書籍情報を登録する
 */
const onAddBooksSubmit = async (): Promise<void> => {
  uiStore.checkPreSubmitInvalidParam()
  if (isInvalid.value) {
    document.querySelector<HTMLDivElement>(`[aria-describedby="${invalidFormItemIds.value[0]}"]`)?.focus()
    return
  }

  start()
  const data = formData.value.map((data) => {
    return data.state
  })
  await apiStore.postBookSaveAll(user.uid, data)
  if (userDetailBookPostResponse.value?.status === StatusCode.STATUS_CODE_CREATED) {
    apiStore.resetBookBulkAnalysisPostResponse()
    uiStore.$reset()
    await navigateTo('/users/books/managements')
  }
  finish()
}
</script>

<template>
  <section :id="IMAGE_ANALYSIS_RESULT_HASH_ID" :class="cssModule['book-form-container']">
    <h2 :class="cssModule['book-form-container__title']">書籍を入力する</h2>
    <p :class="cssModule['book-form-container__description']">
      登録する書籍の情報を入力してください。<br />
      画像から解析した場合は、<span :class="cssModule['book-form-container__description-text--bold']"
        >画像に写っている書籍のタイトルと一致しているか</span
      >確認してください。
    </p>
    <form novalidate @submit.prevent="onClickAddBookSubmit">
      <BookFormTable :class="cssModule['book-form-container__book-form-table']" />
      <BookFormList :class="cssModule['book-form-container__book-form-list']" />

      <template v-if="isInvalid">
        <UiPartsFeedbackAlert
          :id="invalidFormItemIds.join(' ')"
          :class="cssModule['book-form-container__alert-text']"
          type="error"
          role="alert"
          aria-live="assertive"
        >
          入力内容に誤りがあります。入力内容を確認してください。
        </UiPartsFeedbackAlert>
      </template>
      <template v-if="!LangUtil.isNil(userDetailBookPostResponse?.error)">
        <UiPartsFeedbackAlert :class="cssModule['book-form-container__alert-text']" type="error" role="alert" aria-live="assertive">
          書籍の登録に失敗しました。時間をおいて再度お試しください。
        </UiPartsFeedbackAlert>
      </template>

      <div :class="cssModule['book-form-container__action-button-container']">
        <UiPartsGeneralBasicButton type="button" color="normal" @click="uiStore.resetFormState">リセット</UiPartsGeneralBasicButton>
        <UiPartsGeneralBasicButton
          :class="cssModule['book-form-container__action-button']"
          type="button"
          color="normal"
          @click="uiStore.addFormStateRecord"
        >
          <CirclePlusSolid :class="cssModule['book-form-container__action-button-icon']" />
          <span>入力欄を追加</span>
        </UiPartsGeneralBasicButton>
        <UiPartsGeneralBasicButton type="submit" color="primary">登録</UiPartsGeneralBasicButton>
      </div>
    </form>

    <UiPartsFeedbackModal v-model="isModalOpen">
      <template #header>
        <h2 :class="cssModule['modal__title']">
          重複している書籍があります。<br />
          登録しますか？
        </h2>
      </template>
      <template #footer>
        <div :class="cssModule['modal__button-container']">
          <UiPartsGeneralBasicButton type="button" color="normal" @click="isModalOpen = false">キャンセル</UiPartsGeneralBasicButton>
          <UiPartsGeneralBasicButton type="button" color="primary" @click="onAddBooksSubmit">登録する</UiPartsGeneralBasicButton>
        </div>
      </template>
    </UiPartsFeedbackModal>
  </section>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
