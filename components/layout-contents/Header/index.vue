<script setup lang="ts">
/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <header :class="cssModule['header']">
    <NuxtLink :class="cssModule['header__icon-link']" to="/">
      <img
        src="/favicon/favicon-48x48.ico"
        alt="アプリケーションアイコン"
        width="48"
        height="48"
      >
      <div>
        <span :class="cssModule['header__icon-link-text']">BOOK</span>
        <span :class="cssModule['header__icon-link-text']">Realm</span>
      </div>
    </NuxtLink>
  </header>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
