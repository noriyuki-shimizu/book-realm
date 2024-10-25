<script setup lang="ts">
import { ZodIssueCode } from 'zod'
import { useCommonAuthApiStore } from '@/store/common/auth'
import { useUiStore } from '@/store/page/sign-in'

/** Loading Indicator */
const { start, finish } = useLoadingIndicator()

/** CSS Module */
const cssModule = useCssModule('classes')

/** Auth API Store */
const { signInResponse, signIn } = useCommonAuthApiStore()

/** UI Store */
const { formState, setEmail, setPassword, checkForm } = useUiStore()

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
  const { email: emailValid, password: passwordValid } = formState.value.validation
  if (!(emailValid?.success && passwordValid?.success)) {
    return
  }

  start()
  const { email: emailValue, password: passwordValue } = formState.value.data
  await signIn(emailValue, passwordValue)
  if (!LangUtil.isNull(signInResponse.value) && LangUtil.isNull(signInResponse.value.error)) {
    await navigateTo('/home')
  }
  finish()
}
</script>

<template>
  <form :class="cssModule['simple-form']" aria-labelledby="sign-in-form" novalidate @submit="handleSubmit">
    <div :class="cssModule['simple-form__item']">
      <label for="email">
        <span :class="cssModule['simple-form__label-text']">メールアドレス</span>
        <input
          id="email"
          v-model="formState.data.email"
          :class="[cssModule['simple-form__input'], { [cssModule['simple-form__input--error']]: !(LangUtil.isNull(formState.validation.email) || formState.validation.email.success) }]"
          type="email"
          name="email"
          required
          aria-required="true"
          aria-describedby="email-description"
          :aria-invalid="!(LangUtil.isNull(formState.validation.email) || formState.validation.email.success) ? 'true' : 'false'"
          @change="onInputEmail"
        />
      </label>
      <p
        v-if="!(LangUtil.isNull(formState.validation.email) || formState.validation.email.success)"
        id="email-description"
        :class="cssModule['simple-form__error-message']"
        role="alert"
        aria-live="polite"
      >
        <template v-for="issue in formState.validation.email.error.issues" :key="issue.code">
          <template v-if="issue.code === ZodIssueCode.too_small">
            <span :class="cssModule['simple-form__error-text']">メールアドレスを入力して下さい。</span>
          </template>
          <template v-if="issue.code === ZodIssueCode.invalid_string">
            <span :class="cssModule['simple-form__error-text']">メールアドレスの形式で入力して下さい。</span>
          </template>
        </template>
      </p>
    </div>
    <div :class="[cssModule['simple-form__item'], cssModule['simple-form__item--last']]">
      <label for="password">
        <span :class="cssModule['simple-form__label-text']">パスワード</span>
        <input
          id="password"
          v-model="formState.data.password"
          :class="[cssModule['simple-form__input'], { [cssModule['simple-form__input--error']]: !(LangUtil.isNull(formState.validation.password) || formState.validation.password.success) }]"
          type="password"
          name="password"
          required
          aria-required="true"
          aria-describedby="password-description"
          :aria-invalid="!(LangUtil.isNull(formState.validation.password) || formState.validation.password.success) ? 'true' : 'false'"
          @input="onInputPassword"
        />
      </label>
      <p
        v-if="!(LangUtil.isNull(formState.validation.password) || formState.validation.password.success)"
        id="password-description"
        :class="cssModule['simple-form__error-message']"
        role="alert"
        aria-live="polite"
      >
        <template v-for="issue in formState.validation.password.error.issues" :key="issue.code">
          <template v-if="issue.code === ZodIssueCode.too_small">
            <span :class="cssModule['simple-form__error-text']">パスワードを入力して下さい。</span>
          </template>
          <template v-if="issue.code === ZodIssueCode.too_big">
            <span :class="cssModule['simple-form__error-text']">パスワードは255文字以内で入力して下さい。</span>
          </template>
        </template>
      </p>
    </div>
    <template v-if="!(LangUtil.isNull(signInResponse) || LangUtil.isNull(signInResponse.error))">
      <UiPartsFeedbackAlert :class="cssModule['simple-form__alert-text']" type="error">
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
