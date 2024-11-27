<script setup lang="ts">
import GoogleIconSvg from '@/assets/svg/google-icon.svg?component'
import { useCommonAuthApiStore } from '@/store/common/auth'
import { LangUtil } from '#shared/utils/core'

/** Firebase Auth */
const auth = useFirebaseAuth()!

/** Route */
const route = useRoute()

/** Loading Indicator */
const { start, finish } = useLoadingIndicator()

/** CSS Module */
const cssModule = useCssModule('classes')

/** Auth API Store */
const commonAuthApiStore = useCommonAuthApiStore()

/** UI Store Reactive Param */
const { signInGoogleResponse } = storeToRefs(commonAuthApiStore)

/**
 * Google でログインする
 */
const onClickGoogleSignIn = async (): Promise<void> => {
  start()
  await commonAuthApiStore.signInWithGoogle(auth)
  if (!LangUtil.isNull(signInGoogleResponse.value) && LangUtil.isNull(signInGoogleResponse.value.error)) {
    const { query } = route
    const path = LangUtil.isNil(query.redirect) ? '/users/home' : query.redirect.toString()
    await navigateTo(path)
  }
  finish()
}
</script>

<template>
  <div :class="cssModule['external-form']">
    <template v-if="!(LangUtil.isNull(signInGoogleResponse) || LangUtil.isNull(signInGoogleResponse.error))">
      <UiPartsFeedbackAlert :class="cssModule['external-form__alert-text']" type="error" role="alert" aria-live="assertive">
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
