<script setup lang="ts">
import { HEADER_ELEMENT_ID } from '@/constants/components/header/attribute'

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div id="main-layout" :class="cssModule['layout-container']">
    <header :id="HEADER_ELEMENT_ID" :class="cssModule['layout-container__header']">
      <LayoutContentsSimpleHeaderContent :class="cssModule['layout-container__header-content']" />
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
