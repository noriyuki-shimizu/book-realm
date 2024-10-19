<script setup lang="ts">
import NavigationLink from '../NavigationLink/index.vue'
import type { ErrorProps } from '@/types/core/error'

/** Props */
const props = defineProps<ErrorProps>()

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['content-template']">
    <p :class="cssModule['content-template__status-code']">
      <slot name="status">Status Code</slot>
    </p>
    <h1 :class="cssModule['content-template__title']">
      <slot name="title">Error</slot>
    </h1>
    <div :class="cssModule['content-template__item']">
      <slot name="description">Description</slot>
    </div>
    <div :class="cssModule['content-template__item']">
      <slot name="navigate">
        <NavigationLink />
      </slot>
    </div>
    <DevOnly>
      <div :class="cssModule['content-template__item']">
        <pre :class="cssModule['content-template__detail']">{{ props.error }}</pre>
      </div>
    </DevOnly>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
