<script setup lang="ts">
import { useCommonAuthApiStore } from '@/store/common/auth'
import { useUiStore } from '@/store/page/sign-in'
import type { SubmitInvalidParam } from '@/store/page/sign-in'

/** Firebase Auth */
const auth = useFirebaseAuth()!

/** Route */
const route = useRoute()

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
const { formState, submitInvalidParam } = getters

/** UI State Actions */
const { setEmail, setPassword, checkPreSubmitInvalidParam } = actions

/**
 * ログイン処理の実行
 * @param {Event} event イベント
 */
const handleSubmit = async (event: Event): Promise<void> => {
  event.preventDefault()

  checkPreSubmitInvalidParam()
  for (const key in submitInvalidParam.value) {
    if (submitInvalidParam.value[key as keyof SubmitInvalidParam]) {
      document.querySelector<HTMLLabelElement>(`label[for="${key}"]`)?.focus()
      return
    }
  }

  start()
  await signIn(auth, formState.value)
  if (!LangUtil.isNull(signInResponse.value) && LangUtil.isNull(signInResponse.value.error)) {
    const { query } = route
    const path = LangUtil.isNil(query.redirect) ? '/home' : query.redirect.toString()
    await navigateTo(path)
  }
  finish()
}

onMounted(() => {
  document.querySelector<HTMLLabelElement>('label[for="email"]')?.focus()
})
</script>

<template>
  <form :class="cssModule['simple-form']" aria-labelledby="sign-in-form" novalidate @submit="handleSubmit">
    <div :class="cssModule['simple-form__item']">
      <UiPartsDataEntryInputText
        id="email"
        :model-value="formState.email"
        :class="cssModule['simple-form__input-item']"
        :is-error="submitInvalidParam.email"
        name="email"
        type="email"
        required
        aria-describedby="email-description"
        @update:model-value="setEmail"
      >
        <template #label>メールアドレス</template>
      </UiPartsDataEntryInputText>
    </div>
    <div :class="cssModule['simple-form__item']">
      <UiPartsDataEntryInputText
        id="password"
        :model-value="formState.password"
        :class="cssModule['simple-form__input-item']"
        :is-error="submitInvalidParam.password"
        name="password"
        type="password"
        required
        aria-describedby="password-description"
        @update:model-value="setPassword"
      >
        <template #label>パスワード</template>
      </UiPartsDataEntryInputText>
    </div>
    <template v-if="submitInvalidParam.email || submitInvalidParam.password">
      <UiPartsFeedbackAlert
        id="email-description password-description"
        :class="cssModule['simple-form__alert-message']"
        type="error"
        role="alert"
        aria-live="assertive"
      >
        <template v-if="submitInvalidParam.email">「メールアドレス」</template>
        <template v-if="submitInvalidParam.password">「パスワード」</template>
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
