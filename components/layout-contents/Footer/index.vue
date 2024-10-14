<script setup lang="ts">
import GitHubIconSvg from '@/assets/svg/github-icon.svg?component'

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <footer :class="cssModule['footer']">
    <span>@ 2024 Noriyuki Shimizu</span>
    <NuxtLink
      :class="cssModule['footer__link']"
      to="https://github.com/noriyuki-shimizu/book-realm"
      target="_blank"
    >
      <GitHubIconSvg :class="cssModule['footer__icon']" />
      <span :class="cssModule['footer__link-text']">GitHub</span>
    </NuxtLink>
  </footer>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
