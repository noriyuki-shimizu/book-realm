<script setup lang="ts">
import type { Props } from './types'

/** Props */
const props = withDefaults(defineProps<Props>(), {
  type: 'normal'
})

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <p :class="[cssModule['alert'], cssModule[`alert--${props.type}`]]">
    <span><slot /></span>
  </p>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
