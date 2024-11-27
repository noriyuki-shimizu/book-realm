<script setup lang="ts">
import { useCommonAuthApiStore } from '@/store/common/auth'
import { useUiStore, FormKey } from '@/store/page/sign-in'
import { LangUtil } from '#shared/utils/core'
import CircleQuestionIconSvg from '@/assets/svg/circle-question-icon.svg?component'

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
const { signInResponse } = storeToRefs(commonAuthApiStore)

/** UI Store */
const uiStore = useUiStore()

/** UI Store Reactive Param */
const { formState, submitValidation } = storeToRefs(uiStore)

/**
 * バリデーション処理の実行
 * @returns {boolean} バリデーション結果
 */
const handleValidation = (): boolean => {
  uiStore.checkPreSubmitInvalidParam()

  for (const key of Object.keys(submitValidation.value)) {
    const formKey = key as FormKey
    if (submitValidation.value[formKey]) {
      document.querySelector<HTMLLabelElement>(`label[for="${formKey}"]`)?.focus()
      return false
    }
  }

  return true
}

/**
 * ログイン処理の実行
 * @param {Event} event イベント
 */
const handleSubmit = async (event: Event): Promise<void> => {
  event.preventDefault()

  if (!handleValidation()) {
    return
  }

  start()
  await commonAuthApiStore.signIn(auth, formState.value)
  if (!LangUtil.isNull(signInResponse.value) && LangUtil.isNull(signInResponse.value.error)) {
    const { query } = route
    const path = LangUtil.isNil(query.redirect) ? '/users/home' : query.redirect.toString()
    uiStore.$reset()
    await navigateTo(path)
  }
  finish()
}

onMounted(() => {
  document.querySelector<HTMLLabelElement>(`label[for="${FormKey.email}"]`)?.focus()
})
</script>

<template>
  <form :class="cssModule['simple-form']" aria-labelledby="sign-in-form" novalidate @submit="handleSubmit">
    <div :class="cssModule['simple-form__item']">
      <UiPartsDataEntryInputText
        id="email"
        :model-value="formState.email"
        :class="cssModule['simple-form__input-item']"
        :is-error="submitValidation.email"
        name="email"
        type="email"
        required
        aria-describedby="email-description"
        @update:model-value="uiStore.setEmail"
      >
        <template #label>メールアドレス</template>
      </UiPartsDataEntryInputText>
    </div>
    <div :class="cssModule['simple-form__item']">
      <UiPartsDataEntryInputText
        id="password"
        :model-value="formState.password"
        :class="cssModule['simple-form__input-item']"
        :is-error="submitValidation.password"
        name="password"
        type="password"
        required
        aria-describedby="password-description"
        @update:model-value="uiStore.setPassword"
      >
        <template #label>パスワード</template>
      </UiPartsDataEntryInputText>
    </div>
    <template v-if="submitValidation.email || submitValidation.password">
      <UiPartsFeedbackAlert
        id="email-description password-description"
        :class="cssModule['simple-form__alert-message']"
        type="error"
        role="alert"
        aria-live="assertive"
      >
        <template v-if="submitValidation.email">「メールアドレス」</template>
        <template v-if="submitValidation.password">「パスワード」</template>
        に誤りがあります。<br />
        入力内容の確認をお願いします。
      </UiPartsFeedbackAlert>
    </template>
    <template v-if="!(LangUtil.isNull(signInResponse) || LangUtil.isNull(signInResponse.error))">
      <UiPartsFeedbackAlert
        id="email-description password-description"
        :class="cssModule['simple-form__alert-message']"
        type="error"
        role="alert"
        aria-live="assertive"
      >
        ログインに失敗しました。メールアドレス・パスワードを確認してください。
      </UiPartsFeedbackAlert>
    </template>
    <div :class="cssModule['simple-form__link-body']">
      <NuxtLink to="/forgot-password" :class="cssModule['simple-form__link']">
        <CircleQuestionIconSvg :class="cssModule['simple-form__icon']" />
        <span>パスワードを忘れた方</span>
      </NuxtLink>
    </div>
    <UiPartsGeneralBasicButton :class="cssModule['simple-form__button']" type="submit" color="primary">
      ログイン
    </UiPartsGeneralBasicButton>
    <p><NuxtLink to="/sign-up">アカウント登録</NuxtLink>する</p>
  </form>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
