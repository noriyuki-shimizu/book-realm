<script setup lang="ts">
/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['layout-container']">
    <LayoutContentsHeader :class="cssModule['layout-container__header']" />
    <main :class="cssModule['layout-container__main']">
      <slot />
    </main>
    <LayoutContentsFooter :class="cssModule['layout-container__footer']" />
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>