<script setup lang="ts">
import SimpleForm from '../SimpleForm/index.vue'
import AngleLeftSolidIconSvg from '@/assets/svg/angle-left-solid-icon.svg?component'

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <section :class="cssModule['container']">
    <h1 :class="cssModule['container__title']">アカウント登録</h1>
    <SimpleForm :class="cssModule['container__form']" />
    <NuxtLink to="/sign-in" :class="cssModule['container__link']">
      <AngleLeftSolidIconSvg :class="cssModule['container__icon']" />
      <span>ログイン画面に戻る</span>
    </NuxtLink>
  </section>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
