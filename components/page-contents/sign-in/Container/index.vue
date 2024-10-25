<script setup lang="ts">
import FormBody from '../FormBody/index.vue'

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <section :class="cssModule['container']">
    <h1 :class="cssModule['container__title']">ログイン</h1>
    <FormBody />
  </section>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>

