<script setup lang="ts">
import { ZodIssueCode } from 'zod'
import { useCommonAuthApiStore } from '@/store/common/auth'
import { useUiStore, FormKey } from '@/store/page/sign-up'
import CheckSolidIconSvg from '@/assets/svg/check-solid-icon.svg?component'
import XmarkSolidIconSvg from '@/assets/svg/xmark-solid-icon.svg?component'
import { LangUtil } from '#shared/utils/core'

/** Firebase Auth */
const auth = useFirebaseAuth()!

/** Loading Indicator */
const { start, finish } = useLoadingIndicator()

/** CSS Module */
const cssModule = useCssModule('classes')

/** Auth API Store */
const commonAuthApiStore = useCommonAuthApiStore()

/** Auth API Store Reactive Param */
const { signUpResponse } = storeToRefs(commonAuthApiStore)

/** UI Store */
const uiStore = useUiStore()

/** UI Store Reactive Param */
const { formState, submitValidation, validation, emailErrors, passwordErrors } = storeToRefs(uiStore)

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
  await commonAuthApiStore.signUp(auth, uiStore.formState)
  if (!LangUtil.isNull(signUpResponse.value) && LangUtil.isNull(signUpResponse.value.error)) {
    await navigateTo('/sign-up/complete')
  }
  finish()
}

onMounted(() => {
  document.querySelector<HTMLLabelElement>(`label[for="${FormKey.email}"]`)?.focus()
})
</script>

<template>
  <form :class="cssModule['simple-form']" aria-labelledby="sign-up-form" novalidate @submit="handleSubmit">
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
      <ul :class="cssModule['check-list']" aria-label="パスワードポリシーチェックリスト">
        <li :class="cssModule['check-list__item']" aria-live="polite">
          <CheckSolidIconSvg
            v-show="!LangUtil.isNull(validation.email) && !emailErrors.some((error) => error.code === ZodIssueCode.invalid_string)"
            role="img"
            aria-label="有効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]"
          />
          <XmarkSolidIconSvg
            v-show="LangUtil.isNull(validation.email) || emailErrors.some((error) => error.code === ZodIssueCode.invalid_string)"
            role="img"
            aria-label="無効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]"
          />
          <span>メールアドレスの形式</span>
        </li>
      </ul>
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
      <ul :class="cssModule['check-list']" aria-label="パスワードポリシーチェックリスト">
        <li :class="cssModule['check-list__item']" aria-live="polite">
          <CheckSolidIconSvg
            v-show="!LangUtil.isNull(validation.password) && !passwordErrors.some((error) => error.code === ZodIssueCode.too_small)"
            role="img"
            aria-label="有効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]"
          />
          <XmarkSolidIconSvg
            v-show="LangUtil.isNull(validation.password) || passwordErrors.some((error) => error.code === ZodIssueCode.too_small)"
            role="img"
            aria-label="無効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]"
          />
          <span>６文字以上</span>
        </li>
        <li :class="cssModule['check-list__item']" aria-live="polite">
          <CheckSolidIconSvg
            v-show="!LangUtil.isNull(validation.password) && !passwordErrors.some((error) => error.code === ZodIssueCode.too_big)"
            role="img"
            aria-label="有効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]"
          />
          <XmarkSolidIconSvg
            v-show="LangUtil.isNull(validation.password) || passwordErrors.some((error) => error.code === ZodIssueCode.too_big)"
            role="img"
            aria-label="無効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]"
          />
          <span>255文字以下</span>
        </li>
        <li :class="cssModule['check-list__item']" aria-live="polite">
          <CheckSolidIconSvg
            v-show="!LangUtil.isNull(validation.password) && !passwordErrors.some((error) => error.message === 'uppercase')"
            role="img"
            aria-label="有効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]"
          />
          <XmarkSolidIconSvg
            v-show="LangUtil.isNull(validation.password) || passwordErrors.some((error) => error.message === 'uppercase')"
            role="img"
            aria-label="無効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]"
          />
          <span>大文字が含まれている</span>
        </li>
        <li :class="cssModule['check-list__item']" aria-live="polite">
          <CheckSolidIconSvg
            v-show="!LangUtil.isNull(validation.password) && !passwordErrors.some((error) => error.message === 'lowercase')"
            role="img"
            aria-label="有効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]"
          />
          <XmarkSolidIconSvg
            v-show="LangUtil.isNull(validation.password) || passwordErrors.some((error) => error.message === 'lowercase')"
            role="img"
            aria-label="無効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]"
          />
          <span>小文字が含まれている</span>
        </li>
        <li :class="cssModule['check-list__item']" aria-live="polite">
          <CheckSolidIconSvg
            v-show="!LangUtil.isNull(validation.password) && !passwordErrors.some((error) => error.message === 'specialCharacter')"
            role="img"
            aria-label="有効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]"
          />
          <XmarkSolidIconSvg
            v-show="LangUtil.isNull(validation.password) || passwordErrors.some((error) => error.message === 'specialCharacter')"
            role="img"
            aria-label="無効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]"
          />
          <span>特殊文字が含まれている</span>
        </li>
        <li :class="cssModule['check-list__item']" aria-live="polite">
          <CheckSolidIconSvg
            v-show="!LangUtil.isNull(validation.password) && !passwordErrors.some((error) => error.message === 'digit')"
            role="img"
            aria-label="有効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]"
          />
          <XmarkSolidIconSvg
            v-show="LangUtil.isNull(validation.password) || passwordErrors.some((error) => error.message === 'digit')"
            role="img"
            aria-label="無効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]"
          />
          <span>数字が含まれている</span>
        </li>
      </ul>
    </div>
    <div :class="cssModule['simple-form__item']">
      <UiPartsDataEntryInputText
        id="confirmPassword"
        :model-value="formState.confirmPassword"
        :class="cssModule['simple-form__input-item']"
        :is-error="submitValidation.confirmPassword"
        name="confirmPassword"
        type="password"
        required
        aria-describedby="password-confirm-description"
        @update:model-value="uiStore.setConfirmPassword"
      >
        <template #label>パスワード（確認用）</template>
      </UiPartsDataEntryInputText>
      <ul :class="cssModule['check-list']" aria-label="パスワードポリシーチェックリスト">
        <li :class="cssModule['check-list__item']" aria-live="polite">
          <CheckSolidIconSvg
            v-show="
              !LangUtil.isNull(validation.confirmPassword) &&
              !LangUtil.isEmpty(formState.confirmPassword) &&
              formState.password === formState.confirmPassword
            "
            role="img"
            aria-label="有効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]"
          />
          <XmarkSolidIconSvg
            v-show="
              LangUtil.isNull(validation.confirmPassword) ||
              LangUtil.isEmpty(formState.confirmPassword) ||
              formState.password !== formState.confirmPassword
            "
            role="img"
            aria-label="無効"
            :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]"
          />
          <span>パスワード一致</span>
        </li>
      </ul>
    </div>
    <template v-if="submitValidation.email || submitValidation.password || submitValidation.confirmPassword">
      <UiPartsFeedbackAlert
        id="email-description password-description password-confirm-description"
        :class="cssModule['simple-form__alert-message']"
        type="error"
        role="alert"
        aria-live="assertive"
      >
        <template v-if="submitValidation.email">「メールアドレス」</template>
        <template v-if="submitValidation.password">「パスワード」</template>
        <template v-if="submitValidation.confirmPassword">「パスワード（確認用）」</template>
        に誤りがあります。<br />
        入力内容の確認をお願いします。
      </UiPartsFeedbackAlert>
    </template>
    <template v-else-if="!(LangUtil.isNull(signUpResponse) || LangUtil.isNull(signUpResponse.error))">
      <UiPartsFeedbackAlert
        id="email-description password-description password-confirm-description"
        :class="cssModule['simple-form__alert-message']"
        type="error"
        role="alert"
        aria-live="assertive"
      >
        <template v-if="signUpResponse.error.message?.includes('email-already-in-use')">
          入力されたメールアドレスは既に登録されています。ログイン画面からログインしてください。
        </template>
        <template v-else> アカウント登録に失敗しました。メールアドレス・パスワードを確認してください。 </template>
      </UiPartsFeedbackAlert>
    </template>
    <UiPartsGeneralBasicButton :class="cssModule['simple-form__button']" type="submit" color="primary"> 登録 </UiPartsGeneralBasicButton>
  </form>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
