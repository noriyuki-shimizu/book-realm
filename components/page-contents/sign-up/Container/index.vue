<script setup lang="ts">
import SimpleForm from '../SimpleForm/index.vue'

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <section :class="cssModule['container']">
    <h1 :class="cssModule['container__title']">アカウント登録</h1>
    <SimpleForm />
  </section>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>