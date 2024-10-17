<script setup lang="ts">
import { useApiStore, useUiStore } from '@/store/page'

/** API Store Param */
const { postBookBulkAnalysis } = useApiStore()

/** UI Store Param */
const { file, setFile } = useUiStore()

/** CSS Module */
const cssModule = useCssModule('classes')

/** Submit API */
const { execute, pending } = useSubmitApi(async (): Promise<void> => {
  if (LangUtil.isNull(file.value)) {
    return
  }
  const formData = new FormData()
  for (const f of file.value) {
    formData.append('file', f)
  }

  await postBookBulkAnalysis(formData)

  window.scrollTo({ top: 0, behavior: 'smooth' })
})

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
    <UiPartsDataEntryInputFile :model-value="file" :class="cssModule['picture-form__input-file']" @update:model-value="setFile" />

    <section :class="[cssModule['picture-form__preview'], cssModule['preview']]">
      <h3 :class="cssModule['preview__title']">解析対象ファイル</h3>
      <template v-if="!LangUtil.isNull(file) && file.length > 0">
        <div :class="cssModule['preview__image-container']">
          <template v-for="f in file" :key="f.name">
            <img
              :class="cssModule['preview__image']"
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
        <p>ファイルが選択されていません。</p>
      </template>
    </section>

    <UiPartsGeneralBasicButton
      type="submit"
      color="primary"
      :disabled="LangUtil.isNull(file) || (!LangUtil.isNull(file) && !file.length) || pending"
    >
      <div v-show="pending" :class="cssModule['picture-form__submit-text']">
        <UiPartsFeedbackSpinner size="small" />
        解析中...
      </div>
      <div v-show="!pending">
        解析する
      </div>
    </UiPartsGeneralBasicButton>
  </form>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
