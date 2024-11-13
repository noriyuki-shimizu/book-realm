<script setup lang="ts">
import IconLink from '../IconLink/index.vue'

/** CSS Module */
const cssModule = useCssModule('classes')

/**
 * ログインページへ遷移
 */
const onClick = async () => {
  await navigateTo('/sign-in')
}
</script>

<template>
  <div :class="cssModule['guest-header-content']">
    <IconLink />
    <div :class="cssModule['guest-header-content__navigate']">
      <UiPartsGeneralBasicButton type="button" color="primary" @click="onClick"> ログイン </UiPartsGeneralBasicButton>
    </div>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
