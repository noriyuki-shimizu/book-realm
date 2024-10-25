<script setup lang="ts">
/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <section :class="cssModule['form-item']">
    <h2 :class="cssModule['form-item__title']"><slot name="title" /></h2>
    <slot />
  </section>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
