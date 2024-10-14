<script setup lang="ts">
/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['spinner-wrapper']">
    <UiPartsFeedbackSpinner size="large" />
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
