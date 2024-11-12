<script setup lang="ts">
/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['layout-container']">
    <header :class="cssModule['layout-container__header']">
      <LayoutContentsSimpleHeader :class="cssModule['layout-container__header-content']" />
    </header>
    <main :class="cssModule['layout-container__main']">
      <slot />
    </main>
    <footer :class="cssModule['layout-container__footer']">
      <LayoutContentsFooter :class="cssModule['layout-container__footer-content']" />
    </footer>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
