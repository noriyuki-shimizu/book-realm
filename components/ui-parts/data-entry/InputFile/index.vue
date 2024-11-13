<script setup lang="ts">
import type { Props } from './types'
import { LangUtil } from '#shared/utils/core'

const props = withDefaults(defineProps<Props>(), {
  isLoading: false
})

/** CSS Module */
const cssModule = useCssModule('classes')

/** Model */
const model = defineModel<File[] | null>({ required: true })

/** HTML Input Element Ref */
const htmlInputElement = ref<HTMLInputElement | null>(null)

/**
 * モデル値の更新
 * @param {FileList} fileList ファイルリスト
 */
const updateModelValue = (fileList: FileList): void => {
  const files: File[] = []
  for (const file of fileList) {
    files.push(file)
  }
  model.value = files
}

/**
 * 入力の変更時の処理
 * @param {Event} e イベント
 */
const onChange = (e: Event): void => {
  if (!(e.target instanceof HTMLInputElement) || LangUtil.isNull(e.target.files)) {
    return
  }

  updateModelValue(e.target.files)
}

/**
 * ドロップ時の処理
 * @param {DragEvent} e イベント
 */
const onDrop = (e: DragEvent): void => {
  if (LangUtil.isNull(e.dataTransfer)) {
    return
  }

  updateModelValue(e.dataTransfer.files)
}

/**
 * クリック時の処理
 */
const onClick = (): void => {
  if (LangUtil.isNull(htmlInputElement.value)) {
    return
  }
  htmlInputElement.value.click()
}
</script>

<template>
  <div :class="cssModule['input-file']">
    <label for="input-file">
      <input
        id="input-file"
        ref="htmlInputElement"
        :class="cssModule['input-file__input']"
        type="file"
        name="input-file"
        accept="image/png, image/jpeg"
        multiple
        @change="onChange"
        @drop="onDrop"
      />
    </label>
    <span :class="cssModule['input-file__text']">ここにファイルをドロップ</span>
    <span :class="cssModule['input-file__text']">または</span>
    <UiPartsGeneralBasicButton :class="cssModule['input-file__button']" type="button" size="small" color="processing" @click="onClick">
      <UiPartsFeedbackSpinner v-show="props.isLoading" size="small" />
      ファイルを読み込む
    </UiPartsGeneralBasicButton>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
