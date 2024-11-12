<script setup lang="ts">
import FormBody from '../FormBody/index.vue'

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['container']">
    <img src="@/assets/img/book-realm.jpg" alt="" :class="cssModule['container__img']" />
    <section :class="cssModule['container__form']">
      <h1 :class="cssModule['container__title']">ログイン</h1>
      <FormBody />
    </section>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
