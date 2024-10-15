<script setup lang="ts">
/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['header-content']">
    <NuxtLink :class="cssModule['header-content__icon-link']" to="/">
      <img
        src="/favicon/favicon-48x48.ico"
        alt="アプリケーションアイコン"
        width="48"
        height="48"
      >
      <div>
        <span :class="cssModule['header-content__icon-link-text']">BOOK</span>
        <span :class="cssModule['header-content__icon-link-text']">Realm</span>
      </div>
    </NuxtLink>
    <div :class="cssModule['header-content__navigate']">
      <UiPartsGeneralBasicButton
      type="button"
      color="primary"
    >ログイン</UiPartsGeneralBasicButton>
    </div>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
