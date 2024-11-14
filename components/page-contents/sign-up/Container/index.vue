<script setup lang="ts">
import SimpleForm from '../SimpleForm/index.vue'
import AngleLeftSolidIconSvg from '@/assets/svg/angle-left-solid-icon.svg?component'

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['container']">
    <img src="@/assets/img/book-realm.jpg" alt="" :class="cssModule['container__img']" />
    <section :class="cssModule['container__form']">
      <h1 :class="cssModule['container__title']">アカウント登録</h1>
      <SimpleForm :class="cssModule['container__simple-form']" />
      <div :class="cssModule['container__link-wrapper']">
        <NuxtLink to="/sign-in" :class="cssModule['container__link']">
          <AngleLeftSolidIconSvg :class="cssModule['container__icon']" />
          <span>ログイン画面に戻る</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
