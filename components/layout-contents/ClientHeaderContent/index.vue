<script setup lang="ts">
import IconLink from '../IconLink/index.vue'
import UserNavigate from '../UserNavigate/index.vue'

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['client-header-content']">
    <IconLink />
    <UserNavigate />
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
