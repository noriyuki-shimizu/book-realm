<script setup lang="ts">
/** CSS Module */
const cssModule = useCssModule('classes')

/** Model */
const model = defineModel<FileList | null>({ required: true })

/** HTML Input Element Ref */
const htmlInputElement = ref<HTMLInputElement | null>(null)

/** Drop Zone Element Ref */
const dropZoneElement = ref<HTMLDivElement | null>(null)

/**
 * 入力の変更時の処理
 * @param {Event} e イベント
 */
const onChange = (e: Event): void => {
  if (!(e.target instanceof HTMLInputElement) || LangUtil.isNull(e.target.files)) {
    return
  }
  model.value = e.target.files
}

/**
 * ドラッグ時の処理
 * @param {DragEvent} e イベント
 * @param {boolean} isOver ドラッグ中かどうか
 */
const handleDrag = (e: DragEvent, isOver: boolean): void => {
  e.preventDefault()
  if (isOver) {
    dropZoneElement.value?.classList.add(cssModule['drag-over'])
  } else {
    dropZoneElement.value?.classList.remove(cssModule['drag-over'])
  }
}

/**
 * ドラッグオーバー時の処理
 * @param {DragEvent} e イベント
 */
const onDragOver = (e: DragEvent): void => {
  handleDrag(e, true)
}

/**
 * ドラッグリーブ時の処理
 * @param {DragEvent} e イベント
 */
const onDragLeave = (e: DragEvent): void => {
  handleDrag(e, false)
}

/**
 * ドロップ時の処理
 * @param {DragEvent} e イベント
 */
const onDrop = (e: DragEvent): void => {
  handleDrag(e, false)
  if (LangUtil.isNull(e.dataTransfer)) {
    return
  }
  model.value = e.dataTransfer.files
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
    <input
      ref="htmlInputElement"
      :class="cssModule['input-file__input']"
      type="file"
      name="input-file"
      accept="image/png, image/jpeg"
      multiple
      @change="onChange"
    />
    <div
      ref="dropZoneElement"
      :class="[cssModule['input-file__drop-zone'], cssModule['drop-zone']]"
      @drag-over="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <span :class="cssModule['drop-zone__text']">ファイルをここにドロップ</span>
      <UiPartsGeneralBasicButton
        type="button"
        size="small"
        color="processing"
        @click="onClick"
      >
        ファイルを読み込む
      </UiPartsGeneralBasicButton>
    </div>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
