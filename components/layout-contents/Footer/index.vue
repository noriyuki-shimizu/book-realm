<script setup lang="ts">
import GitHubIconSvg from '@/assets/svg/github-icon.svg?component'

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['footer-content']">
    <span>@ 2024 Noriyuki Shimizu</span>
    <DevOnly>
      <NuxtLink :class="cssModule['footer-content__link']" to="https://github.com/noriyuki-shimizu/book-realm" target="_blank">
        <GitHubIconSvg :class="cssModule['footer-content__icon']" aria-hidden="true" />
        <span :class="cssModule['footer-content__link-text']">GitHub</span>
      </NuxtLink>
    </DevOnly>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
