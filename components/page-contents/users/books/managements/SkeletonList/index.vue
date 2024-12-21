<script setup lang="ts">
/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['skeleton-list']">
    <template v-for="(_, index) in [...new Array(5)]" :key="`skeleton-list-${index}`">
      <div :class="cssModule['skeleton-list__card']">
        <div :class="cssModule['skeleton-list__card-content']">
          <div :class="cssModule['skeleton-list__title']"></div>
          <div :class="cssModule['skeleton-list__text']"></div>
        </div>
        <div :class="cssModule['skeleton-list__chevron']"></div>
      </div>
    </template>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
