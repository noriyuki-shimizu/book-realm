<script setup lang="ts">
import EmailForm from '../EmailForm/index.vue'
import PasswordForm from '../PasswordForm/index.vue'
import { EmailFormKey, PasswordFormKey } from '@/store/page/forgot-password';
import AngleLeftSolidIconSvg from '@/assets/svg/angle-left-solid-icon.svg?component'

/** Route */
const route = useRoute()

/** CSS Module */
const cssModule = useCssModule('classes')

/** メールフォームか */
const isEmailForm = computed<boolean>(() => {
  const mode = route.query.mode?.toString()
  const oobCode = route.query.oobCode?.toString()
  return LangUtil.isEmpty(mode) || LangUtil.isEmpty(oobCode)
})

onMounted(() => {
  if (isEmailForm.value) {
    document.querySelector<HTMLLabelElement>(`label[for="${EmailFormKey.email}"]`)?.focus()
  } else {
    document.querySelector<HTMLLabelElement>(`label[for="${PasswordFormKey.password}"]`)?.focus()
  }
})
</script>

<template>
  <section :class="cssModule['container']">
    <h1 :class="cssModule['container__title']">パスワード再設定</h1>
    <div :class="cssModule['container__form-body']">
      <template v-if="isEmailForm">
        <EmailForm />
      </template>
      <template v-else>
        <PasswordForm />
      </template>
    </div>
    <NuxtLink to="/sign-in" :class="cssModule['container__link']">
      <AngleLeftSolidIconSvg :class="cssModule['container__icon']" />
      <span>ログイン画面に戻る</span>
    </NuxtLink>
  </section>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
