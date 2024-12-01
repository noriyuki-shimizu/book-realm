<script setup lang="ts">
import type { User } from 'firebase/auth'
import { LangUtil } from '#shared/utils/core'

/** CSS Module */
const cssModule = useCssModule('classes')

/** Login User */
const user: User | null = await getCurrentUser()

const to = LangUtil.isNull(user) ? '/' : '/users/home'
</script>

<template>
  <NuxtLink :class="cssModule['icon-link']" :to>
    <img src="/favicon/favicon-48x48.ico" alt="アプリケーションアイコン" width="48" height="48" />
    <div>
      <span :class="cssModule['icon-link__text']">BOOK</span>
      <span :class="cssModule['icon-link__text']">Realm</span>
    </div>
  </NuxtLink>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
