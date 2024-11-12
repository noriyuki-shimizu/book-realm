<script setup lang="ts">
import { ZodIssueCode } from 'zod'
import { useCommonAuthApiStore } from '@/store/common/auth'
import type { PasswordFormKey} from '@/store/page/forgot-password'
import { useUiStore } from '@/store/page/forgot-password'
import CheckSolidIconSvg from '@/assets/svg/check-solid-icon.svg?component'
import XmarkSolidIconSvg from '@/assets/svg/xmark-solid-icon.svg?component'

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
const { passwordResetResponse } = storeToRefs(commonAuthApiStore)

/** UI Store */
const uiStore = useUiStore()

/** UI Store Reactive Param */
const {
  passwordFormState,
  passwordValidation,
  passwordSubmitValidation,
  passwordErrors,
} = storeToRefs(uiStore)

/**
 * バリデーション処理の実行
 * @returns {boolean} バリデーション結果
 */
 const handlePasswordValidation = (): boolean => {
  uiStore.checkPreEmailSubmitInvalidParam()

  for (const key of Object.keys(passwordSubmitValidation.value)) {
    const passwordFormKey = key as PasswordFormKey
    if (passwordSubmitValidation.value[passwordFormKey]) {
      document.querySelector<HTMLLabelElement>(`label[for="${passwordFormKey}"]`)?.focus()
      return false
    }
  }

  return true
}

/**
 * パスワード再設定処理の実行
 * @param {Event} event イベント
 */
const handlePasswordSubmit = async (event: Event): Promise<void> => {
  event.preventDefault()

  uiStore.checkPrePasswordSubmitInvalidParam()
  if (!handlePasswordValidation()) {
    return
  }

  start()
  const mode = route.query.mode?.toString() ?? ''
  const oobCode = route.query.oobCode?.toString() ?? ''
  await commonAuthApiStore.passwordReset(auth, passwordFormState.value.password, { mode, oobCode })
  if (!LangUtil.isNull(passwordResetResponse.value) && LangUtil.isNull(passwordResetResponse.value.error)) {
    await navigateTo('/forgot-password/complete')
  }
  finish()
}
</script>

<template>
  <form :class="cssModule['password-form']" aria-labelledby="password-form" novalidate @submit="handlePasswordSubmit">
    <div :class="cssModule['password-form__item']">
      <UiPartsDataEntryInputText
        id="password"
        :model-value="passwordFormState.password"
        :class="cssModule['password-form__input-item']"
        :is-error="passwordSubmitValidation.password"
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
            v-show="!LangUtil.isNull(passwordValidation.password) && !passwordErrors.some((error) => error.code === ZodIssueCode.too_small)" role="img" aria-label="有効" :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]" />
          <XmarkSolidIconSvg v-show="LangUtil.isNull(passwordValidation.password) || passwordErrors.some((error) => error.code === ZodIssueCode.too_small)" role="img" aria-label="無効" :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]" />
          <span>６文字以上</span>
        </li>
        <li :class="cssModule['check-list__item']" aria-live="polite">
          <CheckSolidIconSvg v-show="!LangUtil.isNull(passwordValidation.password) && !passwordErrors.some((error) => error.code === ZodIssueCode.too_big)" role="img" aria-label="有効" :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]" />
          <XmarkSolidIconSvg v-show="LangUtil.isNull(passwordValidation.password) || passwordErrors.some((error) => error.code === ZodIssueCode.too_big)" role="img" aria-label="無効" :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]" />
          <span>255文字以下</span>
        </li>
        <li :class="cssModule['check-list__item']" aria-live="polite">
          <CheckSolidIconSvg v-show="!LangUtil.isNull(passwordValidation.password) && !passwordErrors.some((error) => error.message === 'uppercase')" role="img" aria-label="有効" :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]" />
          <XmarkSolidIconSvg v-show="LangUtil.isNull(passwordValidation.password) || passwordErrors.some((error) => error.message === 'uppercase')" role="img" aria-label="無効" :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]" />
          <span>大文字が含まれている</span>
        </li>
        <li :class="cssModule['check-list__item']" aria-live="polite">
          <CheckSolidIconSvg v-show="!LangUtil.isNull(passwordValidation.password) && !passwordErrors.some((error) => error.message === 'lowercase')" role="img" aria-label="有効" :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]" />
          <XmarkSolidIconSvg v-show="LangUtil.isNull(passwordValidation.password) || passwordErrors.some((error) => error.message === 'lowercase')" role="img" aria-label="無効" :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]" />
          <span>小文字が含まれている</span>
        </li>
        <li :class="cssModule['check-list__item']" aria-live="polite">
          <CheckSolidIconSvg v-show="!LangUtil.isNull(passwordValidation.password) && !passwordErrors.some((error) => error.message === 'specialCharacter')" role="img" aria-label="有効" :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]" />
          <XmarkSolidIconSvg v-show="LangUtil.isNull(passwordValidation.password) || passwordErrors.some((error) => error.message === 'specialCharacter')" role="img" aria-label="無効" :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]" />
          <span>特殊文字が含まれている</span>
        </li>
        <li :class="cssModule['check-list__item']" aria-live="polite">
          <CheckSolidIconSvg v-show="!LangUtil.isNull(passwordValidation.password) && !passwordErrors.some((error) => error.message === 'digit')" role="img" aria-label="有効" :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]" />
          <XmarkSolidIconSvg v-show="LangUtil.isNull(passwordValidation.password) || passwordErrors.some((error) => error.message === 'digit')" role="img" aria-label="無効" :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]" />
          <span>数字が含まれている</span>
        </li>
      </ul>
    </div>
    <div :class="cssModule['password-form__item']">
      <UiPartsDataEntryInputText
        id="confirmPassword"
        :model-value="passwordFormState.confirmPassword"
        :class="cssModule['password-form__input-item']"
        :is-error="passwordSubmitValidation.confirmPassword"
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
          <CheckSolidIconSvg v-show="!LangUtil.isNull(passwordValidation.confirmPassword) && !LangUtil.isEmpty(passwordFormState.confirmPassword) && passwordFormState.password === passwordFormState.confirmPassword" role="img" aria-label="有効" :class="[cssModule['check-list__icon'], cssModule['check-list__icon--success']]" />
          <XmarkSolidIconSvg v-show="LangUtil.isNull(passwordValidation.confirmPassword) || LangUtil.isEmpty(passwordFormState.confirmPassword) || passwordFormState.password !== passwordFormState.confirmPassword" role="img" aria-label="無効" :class="[cssModule['check-list__icon'], cssModule['check-list__icon--error']]" />
          <span>パスワード一致</span>
        </li>
      </ul>
    </div>
    <template v-if="passwordSubmitValidation.password || passwordSubmitValidation.confirmPassword">
      <UiPartsFeedbackAlert
        id="password-description password-confirm-description"
        :class="cssModule['password-form__alert-message']"
        type="error"
        role="alert"
        aria-live="assertive"
      >
        <template v-if="passwordSubmitValidation.password">「パスワード」</template>
        <template v-if="passwordSubmitValidation.confirmPassword">「パスワード（確認用）」</template>
        に誤りがあります。<br />
        入力内容の確認をお願いします。
      </UiPartsFeedbackAlert>
    </template>
    <template v-else-if="!(LangUtil.isNull(passwordResetResponse) || LangUtil.isNull(passwordResetResponse.error))">
      <UiPartsFeedbackAlert
        id="password-description password-confirm-description"
        :class="cssModule['password-form__alert-message']"
        type="error"
        role="alert"
        aria-live="assertive"
      >
        パスワードの再設定に失敗しました。<br />
        正しい順序で再設定できているか、ご確認をお願いします。
      </UiPartsFeedbackAlert>
    </template>
    <UiPartsGeneralBasicButton
      :class="cssModule['password-form__button']"
      type="submit"
      color="primary"
    >
      登録
    </UiPartsGeneralBasicButton>
  </form>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
