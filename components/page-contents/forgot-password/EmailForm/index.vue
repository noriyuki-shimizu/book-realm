<script setup lang="ts">
import { useCommonAuthApiStore } from '@/store/common/auth'
import type { EmailFormKey } from '@/store/page/forgot-password'
import { useUiStore } from '@/store/page/forgot-password'

/** Firebase Auth */
const auth = useFirebaseAuth()!

/** Loading Indicator */
const { start, finish } = useLoadingIndicator()

/** CSS Module */
const cssModule = useCssModule('classes')

/** Auth API Store */
const commonAuthApiStore = useCommonAuthApiStore()

/** UI Store Reactive Param */
const { sendPasswordResetEmailResponse } = storeToRefs(commonAuthApiStore)

/** UI Store */
const uiStore = useUiStore()

/** UI Store Reactive Param */
const { emailFormState, emailSubmitValidation } = storeToRefs(uiStore)

/**
 * バリデーション処理の実行
 * @returns {boolean} バリデーション結果
 */
const handleEmailValidation = (): boolean => {
  uiStore.checkPreEmailSubmitInvalidParam()

  for (const key of Object.keys(emailSubmitValidation.value)) {
    const emailFormKey = key as EmailFormKey
    if (emailSubmitValidation.value[emailFormKey]) {
      document.querySelector<HTMLLabelElement>(`label[for="${emailFormKey}"]`)?.focus()
      return false
    }
  }

  return true
}

/**
 * メール送信処理の実行
 * @param {Event} event イベント
 */
const handleEmailSubmit = async (event: Event): Promise<void> => {
  event.preventDefault()

  if (!handleEmailValidation()) {
    return
  }

  start()
  await commonAuthApiStore.sendPasswordResetEmail(auth, emailFormState.value.email)
  finish()
}
</script>

<template>
  <form :class="cssModule['email-form']" aria-labelledby="email-form" novalidate @submit="handleEmailSubmit">
    <div :class="cssModule['email-form__item']">
      <UiPartsDataEntryInputText
        id="email"
        :model-value="emailFormState.email"
        :class="cssModule['email-form__input-item']"
        :is-error="emailSubmitValidation.email"
        name="email"
        type="email"
        required
        aria-describedby="email-description"
        @update:model-value="uiStore.setEmail"
      >
        <template #label>メールアドレス</template>
      </UiPartsDataEntryInputText>
    </div>
    <template v-if="emailSubmitValidation.email">
      <UiPartsFeedbackAlert
        id="email-description"
        :class="cssModule['email-form__alert-message']"
        type="error"
        role="alert"
        aria-live="assertive"
      >
        「メールアドレス」に誤りがあります。<br />
        入力内容の確認をお願いします。
      </UiPartsFeedbackAlert>
    </template>
    <template v-if="!(LangUtil.isNull(sendPasswordResetEmailResponse) || LangUtil.isNull(sendPasswordResetEmailResponse.error))">
      <UiPartsFeedbackAlert
        id="email-description"
        :class="cssModule['email-form__alert-message']"
        type="error"
        role="alert"
        aria-live="assertive"
      >
        メール送信に失敗しました。メールアドレスを確認してください。
      </UiPartsFeedbackAlert>
    </template>
    <template v-else-if="!LangUtil.isNull(sendPasswordResetEmailResponse) && LangUtil.isNull(sendPasswordResetEmailResponse.error)">
      <UiPartsFeedbackAlert id="email-description" :class="cssModule['email-form__alert-message']" type="success" aria-live="assertive">
        パスワード再設定の案内メールを送信しました。<br />
        メールをご確認の上、再設定をお願いします。
      </UiPartsFeedbackAlert>
    </template>
    <UiPartsGeneralBasicButton :class="cssModule['email-form__button']" type="submit" color="primary"> 送信 </UiPartsGeneralBasicButton>
  </form>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
