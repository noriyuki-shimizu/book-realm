<script setup lang="ts">
import { FOCUSABLE_ELEMENTS } from './constants'

const model = defineModel<boolean>({ required: true, default: false })

/** モーダルの参照 */
const modalRef = ref<HTMLDivElement | null>(null)

/** メイン要素の参照 - layout の最上位レイヤー */
const mainElement = ref<HTMLElement | null>(null)

/** モーダルを開く前にフォーカスされていた要素 */
const focusBeforeElement = ref<Element | null>(null)

/** モーダル内のフォーカス可能な要素 */
const focusableElements = ref<HTMLElement[]>([])

/**
 * ダイアログを開く関数。
 * @description
 * ダイアログを表示状態にして、現在フォーカスされている要素を保存し、
 * ダイアログ内の最初のフォーカス可能な要素にフォーカスを移動します。
 * さらに、背景のスクロールと操作を防ぐために、body に 'fixed' クラスを追加し、
 * スクロール位置の CSS 変数を設定し、main 要素に 'user-select-none' クラスと 'inert' 属性を追加します。
 */
const handleDialogOpen = (): void => {
  focusBeforeElement.value = document.activeElement
  focusableElements.value[0]?.focus()

  document.body.classList.add('fixed')
  mainElement.value?.classList.add('user-select-none')
  mainElement.value?.setAttribute('inert', 'true')
}

/**
 * ダイアログを閉じる処理を行う関数。
 * @description
 * - ダイアログの表示状態を false に設定します。
 * - ダイアログを開く前にフォーカスがあった要素にフォーカスを戻します。
 * - フォーカスがあった要素の参照をクリアします。
 * - スクロール位置を復元します。
 * - 固定クラスをボディから削除します。
 * - メイン要素からユーザー選択不可クラスを削除します。
 * - メイン要素の inert 属性を削除します。
 */
const handleDialogClose = (): void => {
  ;(focusBeforeElement.value as HTMLElement | null)?.focus()
  focusBeforeElement.value = null

  document.body.classList.remove('fixed')
  mainElement.value?.classList.remove('user-select-none')
  mainElement.value?.removeAttribute('inert')
}

/**
 * ダイアログコンテナ内のキーボード操作を処理する関数。
 *
 * @param {KeyboardEvent} e - キーボードイベント。
 * @description
 * - `Tab`キー: フォーカスを最初または最後のフォーカス可能な要素にループさせる。
 *   - `Shift + Tab`: 最初のフォーカス可能な要素から最後のフォーカス可能な要素にフォーカスを移動。
 *   - `Tab`: 最後のフォーカス可能な要素から最初のフォーカス可能な要素にフォーカスを移動。
 * - `Escape`キー: ダイアログを閉じる。
 */
const handleKeydownDialogContainer = (e: KeyboardEvent): void => {
  if (modalRef.value?.style.display === 'none') {
    return
  }

  const firstFocusableElement = focusableElements.value[0]
  const lastFocusableElement = focusableElements.value[focusableElements.value.length - 1]

  if (e.code === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        e.preventDefault()
        lastFocusableElement.focus()
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        e.preventDefault()
        firstFocusableElement.focus()
      }
    }
  }
  if (e.code === 'Escape') {
    handleDialogClose()
  }
}

onMounted(() => {
  mainElement.value = document.getElementById('main-layout')
  focusableElements.value = [...(modalRef.value?.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS.join(',')) ?? [])]

  window.addEventListener('keydown', handleKeydownDialogContainer)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydownDialogContainer)
})

watch(
  () => model.value,
  (isOpen) => {
    model.value = isOpen
    if (isOpen) {
      handleDialogOpen()
    } else {
      handleDialogClose()
    }
  }
)
</script>

<template>
  <Teleport to="#teleports">
    <Transition
      enter-from-class="dialog-enter-from"
      enter-active-class="dialog-enter-active"
      leave-active-class="dialog-leave-active"
      leave-to-class="dialog-leave-to"
    >
      <div v-show="model" id="dialog" ref="modalRef" class="dialog">
        <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions vuejs-accessibility/click-events-have-key-events -->
        <div class="dialog__bg-layer" @click="model = false"></div>
        <div class="dialog__container" role="dialog" aria-modal="true" aria-labelledby="dialog-header" aria-describedby="dialog-desc">
          <div v-if="$slots.header" id="dialog-header" class="dialog__header"><slot name="header" /></div>
          <div v-if="$slots.desc" id="dialog-desc" class="dialog__desc"><slot name="desc" /></div>
          <div v-if="$slots.footer" class="dialog__footer"><slot name="footer" /></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
@use './style.scss';
</style>
