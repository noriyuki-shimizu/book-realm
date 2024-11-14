<script setup lang="ts">
import { useApiStore, useUiStore } from '@/store/page'
import { LangUtil } from '#shared/utils/core'
import { IMAGE_ANALYSIS_RESULT_HASH_ID } from '@/constants/business/router/hash'

/** Route */
const route = useRoute()

/** ファイル読み込み中か */
const isFileLoading = ref<boolean>(false)

/** API Store Param */
const apiStore = useApiStore()

/** UI Store Param */
const uiStore = useUiStore()

/** UI Store Reactive Param */
const { files } = storeToRefs(uiStore)

/** CSS Module */
const cssModule = useCssModule('classes')

/** Submit API */
const { execute, pending } = useSubmitApi(async (): Promise<void> => {
  if (LangUtil.isNull(files.value)) {
    return
  }
  const formData = new FormData()
  for (const f of files.value) {
    formData.append('file', f)
  }

  await apiStore.postBookBulkAnalysis(formData)

  await navigateTo({
    path: route.path,
    hash: `#${IMAGE_ANALYSIS_RESULT_HASH_ID}`
  })
})

/**
 * ファイルデータを更新する
 * @param {File[] | null} files ファイルデータ
 */
const updateFiles = async (files: File[] | null): Promise<void> => {
  isFileLoading.value = true
  await uiStore.setFiles(files)
  isFileLoading.value = false
}

/**
 * 画像データを変換する
 * @param {File} file ファイルデータ
 */
const convertImageSrc = (file: File): string => {
  return URL.createObjectURL(file)
}
</script>

<template>
  <form :class="cssModule['picture-form']" @submit.prevent="execute">
    <UiPartsDataEntryInputFile
      :model-value="files"
      :is-loading="isFileLoading"
      :class="cssModule['picture-form__input-file']"
      @update:model-value="updateFiles"
    />

    <UiPartsGeneralBasicButton
      type="submit"
      color="primary"
      :class="cssModule['picture-form__submit']"
      :disabled="LangUtil.isNull(files) || (!LangUtil.isNull(files) && !files.length) || pending"
    >
      <div v-show="pending" :class="cssModule['picture-form__submit-text']">
        <UiPartsFeedbackSpinner size="small" />
        解析中...
      </div>
      <div v-show="!pending">解析する</div>
    </UiPartsGeneralBasicButton>

    <template v-if="!LangUtil.isNull(files) && files.length > 0">
      <div :class="cssModule['picture-form__image-container']">
        <template v-for="f in files" :key="f.name">
          <img
            :class="cssModule['picture-form__image']"
            :src="convertImageSrc(f)"
            :alt="f.name"
            sizes="(max-width: 896px) 200px, 300px"
            loading="lazy"
            decoding="async"
          />
        </template>
      </div>
    </template>
    <template v-else>
      <p>ファイルを読み込むと、こちらにプレビューが表示されます。</p>
    </template>
  </form>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
