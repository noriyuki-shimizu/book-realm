<script setup lang="ts">
import { ZodIssueCode } from 'zod'
import { useCommonAuthApiStore } from '@/store/common/auth'
import { useUiStore } from '@/store/page/sign-in'

/** Nuxt App */
const { $auth } = useNuxtApp()

/** Loading Indicator */
const { start, finish } = useLoadingIndicator()

/** CSS Module */
const cssModule = useCssModule('classes')

/** Auth API Store */
const { getters: commonAuthApiGetters, actions: commonAuthApiActions } = useCommonAuthApiStore()

/** Auth API Store Getters */
const { signInResponse } = commonAuthApiGetters

/** Auth API Store Actions */
const { signIn } = commonAuthApiActions

/** UI Store */
const { getters, actions } = useUiStore()

/** UI State Getters */
const { formState, emailErrorCodes, passwordErrorCodes } = getters

/** UI State Actions */
const { setEmail, setPassword, checkForm } = actions

/**
 * メールアドレスの入力イベント
 * @param {Event} event イベント
 */
const onInputEmail = (event: Event): void => {
  const target = event.target
  if (!(target instanceof HTMLInputElement)) {
    return
  }
  setEmail(target.value)
}

/**
 * パスワードの入力イベント
 * @param {Event} event イベント
 */
const onInputPassword = (event: Event): void => {
  const target = event.target
  if (!(target instanceof HTMLInputElement)) {
    return
  }
  setPassword(target.value)
}

/**
 * ログイン処理の実行
 * @param {Event} event イベント
 */
const handleSubmit = async (event: Event): Promise<void> => {
  event.preventDefault()

  checkForm()
  if (!(LangUtil.isNull(formState.value.validation) || formState.value.validation.success)) {
    return
  }

  start()
  const { email, password } = formState.value.data
  await signIn($auth, {email, password})
  if (!LangUtil.isNull(signInResponse.value) && LangUtil.isNull(signInResponse.value.error)) {
    await navigateTo('/home')
  }
  finish()
}
</script>

<template>
  <form :class="cssModule['simple-form']" aria-labelledby="sign-in-form" novalidate @submit="handleSubmit">
    <div :class="cssModule['simple-form__item']">
      <label :class="cssModule['simple-form__input-item']" for="email">
        <span :class="cssModule['simple-form__label-text']">メールアドレス</span>
        <input
          id="email"
          v-model="formState.data.email"
          :class="[cssModule['simple-form__input'], { [cssModule['simple-form__input--error']]: !LangUtil.isEmpty(emailErrorCodes) }]"
          type="email"
          name="email"
          required
          aria-required="true"
          aria-describedby="email-description"
          :aria-invalid="!LangUtil.isEmpty(emailErrorCodes) ? 'true' : 'false'"
          @change="onInputEmail"
        />
      </label>
      <p
        v-if="!LangUtil.isEmpty(emailErrorCodes)"
        id="email-description"
        :class="cssModule['simple-form__error-message']"
        role="alert"
        aria-live="polite"
      >
        <template v-for="code in emailErrorCodes" :key="code">
          <template v-if="code === ZodIssueCode.too_small">
            <span :class="cssModule['simple-form__error-text']">メールアドレスを入力して下さい。</span>
          </template>
          <template v-if="code === ZodIssueCode.invalid_string">
            <span :class="cssModule['simple-form__error-text']">メールアドレスの形式で入力して下さい。</span>
          </template>
        </template>
      </p>
    </div>
    <div :class="[cssModule['simple-form__item'], cssModule['simple-form__item--last']]">
      <label :class="cssModule['simple-form__input-item']" for="password">
        <span :class="cssModule['simple-form__label-text']">パスワード</span>
        <input
          id="password"
          v-model="formState.data.password"
          :class="[cssModule['simple-form__input'], { [cssModule['simple-form__input--error']]: !LangUtil.isEmpty(passwordErrorCodes) }]"
          type="password"
          name="password"
          required
          aria-required="true"
          aria-describedby="password-description"
          :aria-invalid="!LangUtil.isEmpty(passwordErrorCodes) ? 'true' : 'false'"
          @input="onInputPassword"
        />
      </label>
      <p
        v-if="!LangUtil.isEmpty(passwordErrorCodes)"
        id="password-description"
        :class="cssModule['simple-form__error-message']"
        role="alert"
        aria-live="polite"
      >
        <template v-for="code in passwordErrorCodes" :key="code">
          <template v-if="code === ZodIssueCode.too_small">
            <span :class="cssModule['simple-form__error-text']">パスワードを入力して下さい。</span>
          </template>
          <template v-if="code === ZodIssueCode.too_big">
            <span :class="cssModule['simple-form__error-text']">パスワードは255文字以内で入力して下さい。</span>
          </template>
        </template>
      </p>
    </div>
    <template v-if="!(LangUtil.isNull(signInResponse) || LangUtil.isNull(signInResponse.error))">
      <UiPartsFeedbackAlert
        :class="cssModule['simple-form__alert-text']"
        type="error"
        role="alert"
        aria-live="assertive"
      >
        ログインに失敗しました。メールアドレス・パスワードを確認してください。
      </UiPartsFeedbackAlert>
    </template>
    <UiPartsGeneralBasicButton :class="cssModule['simple-form__button']" type="submit" color="primary" >
      ログイン
    </UiPartsGeneralBasicButton>
    <p>
      <NuxtLink to="/sign-up">アカウント登録</NuxtLink>する
    </p>
  </form>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
