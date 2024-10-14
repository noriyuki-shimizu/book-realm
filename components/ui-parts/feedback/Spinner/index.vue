<script setup lang="ts">
import type { Props } from './types'
import LoadingIconSvg from '@/assets/svg/loading-icon.svg?component'

/** Props */
const props = withDefaults(defineProps<Props>(), {
  size: 'default'
})

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <LoadingIconSvg :class="[cssModule['spinner'], cssModule[`spinner--${props.size}`]]" />
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
