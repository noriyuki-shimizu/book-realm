<script setup lang="ts">
import IconLink from '../IconLink/index.vue'
import UserNavigate from '../UserNavigate/index.vue'

/** CSS Module */
const cssModule = useCssModule('classes')

/**
 * 書籍管理ページへ遷移
 */
const toBookManagement = async (): Promise<void> => {
  await navigateTo('/users/books/managements')
}
</script>

<template>
  <div :class="cssModule['client-header-content']">
    <IconLink />
    <div :class="cssModule['client-header-content__right-nav']">
      <UiPartsGeneralBasicButton type="button" color="primary" @click="toBookManagement">書籍一覧</UiPartsGeneralBasicButton>
      <UserNavigate />
    </div>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
