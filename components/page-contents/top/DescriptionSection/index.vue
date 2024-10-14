<script setup lang="ts">
/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <section :class="cssModule['description-section']">
    <h2 :class="cssModule['description-section__title']">
      <slot name="icon" />
      <span><slot name="title" /></span>
    </h2>
    <p>
      <slot />
    </p>
  </section>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
