<script setup lang="ts">
/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <section :class="cssModule['container']">
    <h1 :class="cssModule['container__title']">パスワードの再設定が完了しました！</h1>
    <p :class="cssModule['container__navigation']">
      <NuxtLink to="/sign-in">ログイン画面へ</NuxtLink>
    </p>
  </section>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
