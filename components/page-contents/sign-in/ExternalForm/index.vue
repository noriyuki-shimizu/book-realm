<script setup lang="ts">
import GoogleIconSvg from '@/assets/svg/google-icon.svg?component'
import { useCommonAuthApiStore } from '@/store/common/auth'

/** Loading Indicator */
const { start, finish } = useLoadingIndicator()

/** CSS Module */
const cssModule = useCssModule('classes')

/** Auth API Store */
const { signInGoogleResponse, signInWithGoogle } = useCommonAuthApiStore()

/**
 * Google でログインする
 */
const onClickGoogleSignIn = async (): Promise<void> => {
  start()
  await signInWithGoogle()
  if (!LangUtil.isNull(signInGoogleResponse.value) && LangUtil.isNull(signInGoogleResponse.value.error)) {
    await navigateTo('/home')
  }
  finish()
}
</script>

<template>
  <div :class="cssModule['external-form']">
    <template v-if="!(LangUtil.isNull(signInGoogleResponse) || LangUtil.isNull(signInGoogleResponse.error))">
      <UiPartsFeedbackAlert
        :class="cssModule['external-form__alert-text']"
        type="error"
      >
        Google アカウントにおけるログインに失敗しました。
      </UiPartsFeedbackAlert>
    </template>
    <UiPartsGeneralBasicButton type="button" :class="cssModule['external-form__button']" @click="onClickGoogleSignIn">
      <GoogleIconSvg :class="cssModule['external-form__icon']" />
      Google でログインする
    </UiPartsGeneralBasicButton>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
