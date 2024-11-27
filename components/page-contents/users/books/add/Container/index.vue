<script setup lang="ts">
import PictureFormContainer from '../PictureFormContainer/index.vue'
import BookFormContainer from '../BookFormContainer/index.vue'

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['container']">
    <h1 :class="cssModule['container__title']">書籍登録</h1>
    <PictureFormContainer :class="cssModule['container__picture-form-container']" />
    <BookFormContainer />
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
