<script setup lang="ts">
/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <NuxtLink :class="cssModule['icon-link']" to="/">
    <img
      src="/favicon/favicon-48x48.ico"
      alt="アプリケーションアイコン"
      width="48"
      height="48"
    >
    <div>
      <span :class="cssModule['icon-link__text']">BOOK</span>
      <span :class="cssModule['icon-link__text']">Realm</span>
    </div>
  </NuxtLink>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
