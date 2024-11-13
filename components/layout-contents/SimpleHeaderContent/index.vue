<script setup lang="ts">
import IconLink from '../IconLink/index.vue'

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['simple-header-content']">
    <IconLink />
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
