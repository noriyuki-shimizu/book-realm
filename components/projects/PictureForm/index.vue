<script setup lang="ts">
import type { Props } from './types'
import { LangUtil } from '#shared/utils/core'
import { IMAGE_ANALYSIS_RESULT_HASH_ID } from '@/constants/business/router/hash'

/** Props */
const props = defineProps<Props>()

/** Model */
const model = defineModel<File[] | null>({ required: true })

/** Route */
const route = useRoute()

/** ファイル読み込み中か */
const isFileLoading = ref<boolean>(false)

/** CSS Module */
const cssModule = useCssModule('classes')

/** Submit API */
const { execute, pending } = useSubmitApi(async (): Promise<void> => {
  if (LangUtil.isNull(model.value)) {
    return
  }
  const formData = new FormData()
  for (const f of model.value) {
    formData.append('file', f)
  }

  await props.onSubmit(formData)

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
  await props.onChange(files)
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
      :model-value="model"
      :is-loading="isFileLoading"
      :class="cssModule['picture-form__input-file']"
      @update:model-value="updateFiles"
    />

    <UiPartsGeneralBasicButton
      type="submit"
      color="primary"
      :class="cssModule['picture-form__submit']"
      :disabled="LangUtil.isNull(model) || (!LangUtil.isNull(model) && !model.length) || pending"
    >
      <div v-show="pending" :class="cssModule['picture-form__submit-text']">
        <UiPartsFeedbackSpinner size="small" />
        解析中...
      </div>
      <div v-show="!pending">解析</div>
    </UiPartsGeneralBasicButton>

    <template v-if="!LangUtil.isNull(model) && model.length > 0">
      <div :class="cssModule['picture-form__image-container']">
        <template v-for="f in model" :key="f.name">
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
