<script setup lang="ts">
import type { Props } from './types'
import { LangUtil } from '#shared/utils/core'

/** CSS Module */
const cssModule = useCssModule('classes')

/** Props */
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  type: 'text',
  required: false,
  placeholder: '',
  isError: false,
  ariaDescribedby: ''
})

/** Model */
const model = defineModel<string>({ required: true })

/**
 * input triggered
 * @param {Event} event イベント
 */
const onInput = (event: Event): void => {
  const target = event.target
  if (!(target instanceof HTMLInputElement)) {
    return
  }
  model.value = target.value
}

/**
 * change triggered
 * @param {Event} event イベント
 */
const onChange = (event: Event): void => {
  const target = event.target
  if (!(target instanceof HTMLInputElement)) {
    return
  }
  model.value = target.value.trim()
}
</script>

<template>
  <label :class="cssModule['input-text']" :for="props.id">
    <div v-if="!LangUtil.isEmpty($slots.label)" :class="cssModule['input-text__label-area']">
      <UiPartsDataDisplayTag v-if="props.required" color="red">必須</UiPartsDataDisplayTag>
      <span :class="[cssModule['input-text__text'], cssModule['input-text__text--bold']]"><slot name="label" /></span>
    </div>
    <input
      :id="props.id"
      :model-value="model"
      :value="model"
      :name="props.name"
      :class="[
        cssModule['input-text__input'],
        cssModule[`input-text__input--${props.size}`],
        { [cssModule['input-text__input--error']]: props.isError }
      ]"
      :type="props.type"
      :required="props.required"
      :placeholder="props.placeholder"
      :aria-required="props.required"
      :aria-describedby="props.ariaDescribedby"
      :aria-invalid="props.isError ? 'true' : 'false'"
      @input="onInput"
      @change="onChange"
    />
  </label>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
