<script setup lang="ts">
/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <section :class="cssModule['container']">
    <h1 :class="cssModule['container__title']">登録が完了しました！</h1>
    <div :class="cssModule['container__navigation']">
      <NuxtLink to="/home">Book Realm を始める</NuxtLink>
    </div>
  </section>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>