<script setup lang="ts">
import FormItem from '../FormItem/index.vue'
import SimpleForm from '../SimpleForm/index.vue'
import ExternalForm from '../ExternalForm/index.vue'

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['form-body']">
    <FormItem>
      <template #title>外部サービスからログイン</template>
      <ExternalForm />
    </FormItem>
    <FormItem>
      <template #title>メールアドレス・パスワードでログイン</template>
      <SimpleForm />
    </FormItem>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
