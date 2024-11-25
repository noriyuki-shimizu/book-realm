<script setup lang="ts">
import { useApiStore, useUiStore } from '@/store/page/books/add'
import { LangUtil } from '#shared/utils/core'
import { StatusCode } from '@/enums/common/http/statusCode'
import { IMAGE_ANALYSIS_RESULT_HASH_ID } from '@/constants/business/router/hash'

/** API Store */
const apiStore = useApiStore()

/** CSS Module */
const cssModule = useCssModule('classes')

/** Route */
const route = useRoute()

/** API Store Reactive Param */
const { bookBulkAnalysisPostResponse } = storeToRefs(apiStore)

/** UI Store Param */
const uiStore = useUiStore()

/** UI Store Reactive Param */
const { files } = storeToRefs(uiStore)

/**
 * 画像から書籍を解析し、フォームに反映する
 * @param {FormData} data フォームデータ
 */
const onBookBulkAnalysisSubmit = async (data: FormData): Promise<void> => {
  await apiStore.postBookBulkAnalysis(data)
  if (LangUtil.isNull(bookBulkAnalysisPostResponse.value)) {
    return
  }

  const responseData = bookBulkAnalysisPostResponse.value.data ?? []
  uiStore.updateFormStateList(
    responseData.map((response) => {
      const { title, author, price, publisher, publishedDate } = response
      return {
        title,
        author: author ?? '',
        price: LangUtil.isNull(price) ? '' : String(price),
        publisher: publisher ?? '',
        publishedDate: LangUtil.isNull(publishedDate) ? '' : String(publishedDate)
      }
    })
  )

  await navigateTo({
    path: route.path,
    hash: `#${IMAGE_ANALYSIS_RESULT_HASH_ID}`
  })
}
</script>

<template>
  <section :class="cssModule['picture-form-container']">
    <h2 :class="cssModule['picture-form-container__title']">画像から書籍を解析する</h2>
    <p :class="cssModule['picture-form-container__description']">解析を実施した際、「書籍を入力する」フォームに反映されます。</p>
    <template v-if="!LangUtil.isNull(bookBulkAnalysisPostResponse) && !LangUtil.isNull(bookBulkAnalysisPostResponse.error)">
      <UiPartsFeedbackAlert
        v-if="bookBulkAnalysisPostResponse.error.statusCode === StatusCode.STATUS_CODE_BAD_REQUEST"
        :class="cssModule['picture-form-container__alert-text']"
        type="error"
        role="alert"
        aria-live="assertive"
      >
        ファイルの解析に失敗しました。書籍が正しく写されているか確認してください。
      </UiPartsFeedbackAlert>
      <UiPartsFeedbackAlert
        v-else-if="bookBulkAnalysisPostResponse.error.statusCode === StatusCode.STATUS_CODE_PAYLOAD_TOO_LARGE"
        :class="cssModule['picture-form-container__alert-text']"
        type="error"
        role="alert"
        aria-live="assertive"
      >
        ファイルサイズが大きすぎます。ファイルサイズを小さくして再度お試しください。
      </UiPartsFeedbackAlert>
    </template>
    <template v-else-if="!LangUtil.isNull(bookBulkAnalysisPostResponse) && !LangUtil.isNull(bookBulkAnalysisPostResponse.data)">
      <UiPartsFeedbackAlert :class="cssModule['picture-form-container__alert-text']" type="success" aria-live="assertive">
        ファイルの解析が完了しました。解析結果は「書籍を入力する」フォームに反映されています。
      </UiPartsFeedbackAlert>
    </template>
    <ProjectsPictureForm
      :class="cssModule['picture-form-container__form']"
      :model-value="files"
      :on-change="uiStore.setFiles"
      :on-submit="onBookBulkAnalysisSubmit"
      @update:model-value="uiStore.setFiles"
    />
  </section>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
