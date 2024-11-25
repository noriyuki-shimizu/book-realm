<script setup lang="ts">
import type { Props } from './types'

/** Props */
const props = withDefaults(defineProps<Props>(), {
  color: 'gray'
})

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <span :class="[cssModule['tag'], cssModule[`tag--${props.color}`]]"><slot /></span>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
