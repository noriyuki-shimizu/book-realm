<script setup lang="ts">
import type { Props } from './types'

/** Props */
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  color: 'normal',
})

/** Emits */
const emit = defineEmits<{
  (e: 'click'): void
}>()

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <button
    :type="props.type"
    :class="[cssModule['basic-button'], cssModule[`basic-button--${props.size}`], cssModule[`basic-button--${props.color}`]]"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>