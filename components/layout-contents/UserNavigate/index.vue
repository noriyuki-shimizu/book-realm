<script setup lang="ts">
import type { User } from 'firebase/auth'
import UserMenu from '../UserMenu/index.vue'
import { LangUtil } from '#shared/utils/core'
import UserIconSvg from '@/assets/svg/user-icon.svg?component'

/** CSS Module */
const cssModule = useCssModule('classes')

/** Login User */
const user: User | null = await getCurrentUser()

if (LangUtil.isNull(user)) {
  throw createError('User data is null.')
}

/** アイコンナビゲーションが開かれているか */
const isIconNavigateOpen = ref<boolean>(false)

/**
 * アイコンナビゲーションの開閉
 */
const toggleIconNavigate = (): void => {
  isIconNavigateOpen.value = !isIconNavigateOpen.value
}

/**
 * Escキーが押されたときにアイコンナビゲーションを閉じる
 * @param {KeyboardEvent} event キーボードイベント
 */
const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    isIconNavigateOpen.value = false
  }
}

/**
 * コンテンツ外がクリックされたときにアイコンナビゲーションを閉じる
 * @param {MouseEvent} event マウスイベント
 */
const handleClickOutside = (event: MouseEvent): void => {
  const userNavigateElement = document.querySelector(`.${cssModule['user-navigate']}`)
  if (userNavigateElement && !userNavigateElement.contains(event.target as Node)) {
    isIconNavigateOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div :class="cssModule['user-navigate']">
    <button type="button" :class="cssModule['user-navigate__button']" @click="toggleIconNavigate">
      <template v-if="LangUtil.isNull(user.photoURL)">
        <div :class="cssModule['user-navigate__icon-svg-wrapper']">
          <UserIconSvg role="img" aria-label="ユーザーメニューを開くアイコン" :class="cssModule['user-navigate__icon-svg']" />
        </div>
      </template>
      <template v-else>
        <img
          :class="cssModule['user-navigate__icon-img']"
          :src="user.photoURL"
          alt="ユーザーメニューを開くアイコン"
          loading="lazy"
          decoding="async"
        />
      </template>
    </button>
    <UserMenu v-show="isIconNavigateOpen" :class="cssModule['user-navigate__user-menu']" />
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
