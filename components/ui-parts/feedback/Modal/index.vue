<script setup lang="ts">
import type { Props } from './types'
import { LangUtil } from '#shared/utils/core'

/** Props */
const props = defineProps<Props>()

/** Emits */
const emit = defineEmits<{
  (e: 'close'): void
}>()

/** CSS Module */
const cssModule = useCssModule('classes')

/**
 * モーダル以外の箇所をクリックした際にモーダルを閉じる
 * @param {MouseEvent} event マウスイベント
 */
const handleClickOutside = (event: MouseEvent): void => {
  if (!(event.target instanceof Node)) {
    return
  }
  const modalElement = document.querySelector(`.${cssModule['modal']}`)
  if (!LangUtil.isNull(modalElement) && !modalElement.contains(event.target)) {
    emit('close')
  }
}

/**
 * Escキーが押されたときにモーダルを閉じる
 * @param {KeyboardEvent} event キーボードイベント
 */
const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="#teleports">
    <Transition
      :enter-from-class="cssModule['modal-enter-from']"
      :enter-active-class="cssModule['modal-enter-active']"
      :leave-active-class="cssModule['modal-leave-active']"
      :leave-to-class="cssModule['modal-leave-to']"
    >
      <div v-if="props.isOpen" :class="cssModule['modal-wrapper']">
        <div :class="cssModule['modal']">
          <div v-if="$slots.header" :class="cssModule['modal__header']"><slot name="header" /></div>
          <div v-if="$slots.default" :class="cssModule['modal__body']"><slot /></div>
          <div v-if="$slots.footer" :class="cssModule['modal__footer']"><slot name="footer" /></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
