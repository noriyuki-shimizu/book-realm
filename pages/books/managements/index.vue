<script setup lang="ts">
import CircleInfoSolidSvg from '@/assets/svg/circle-info-solid.svg?component'

/** Runtime Config */
const runtimeConfig = useRuntimeConfig()

useHeadSafe(() => {
  const title = '書籍を管理'
  const description = '書籍の管理画面です。保存した書籍の確認・編集を行います。'
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'og:locale', content: 'ja_JP' },
      {
        name: 'og:url',
        content: `${runtimeConfig.public.pageBaseUrl}/books/managements`
      },
      {
        name: 'og:image',
        content: `${runtimeConfig.public.pageBaseUrl}/favicon/favicon-256x256.ico`
      },
      { name: 'og:site_name', content: 'BOOK Realm' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description }
    ]
  }
})

definePageMeta({
  auth: false,
  layout: 'client'
})

/** CSS Module */
const cssModule = useCssModule('classes')

/**
 * 書籍登録画面へ遷移する
 */
const toAddBooks = async (): Promise<void> => {
  await navigateTo('/books/add')
}
</script>

<template>
  <div :class="cssModule['container']">
    <div :class="cssModule['container__title-container']">
      <h1 :class="cssModule['container__title']">書籍管理</h1>
      <UiPartsGeneralBasicButton type="button" color="primary" @click="toAddBooks">登録する</UiPartsGeneralBasicButton>
    </div>
    <section :class="cssModule['empty-section']">
      <h2 :class="cssModule['empty-section__title']">書籍が登録されていません。</h2>
      <p :class="cssModule['empty-section__description']">
        <CircleInfoSolidSvg :class="cssModule['empty-section__icon']" />
        <span>書籍の登録を実施してください。</span>
      </p>
      <p :class="cssModule['empty-section__description']">
        登録には「書籍のタイトル」「著者名」「価格」「出版社名」「出版年月日」情報を入力する必要があります。
      </p>
      <p :class="cssModule['empty-section__description']">また、書籍の写った画像を読み込ませることでも登録が可能となっております。</p>
    </section>
  </div>
</template>

<style module="classes" lang="scss">
@use '/assets/style/mixin/font' as font;
@use '@/assets/style/mixin/mediaQuery' as mediaQuery;

.container {
  padding: 24px;
  background-color: var(--color-background-light);
  border-radius: 8px;

  @include mediaQuery.media {
    padding: 24px 16px;
    border-radius: 0;
  }

  &__title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    @include mediaQuery.media {
      margin-bottom: 16px;
    }
  }

  &__title {
    @include font.font-size(32, 32);

    @include mediaQuery.media {
      @include font.font-size(24, 32);
    }
  }
}

.empty-section {
  &__title {
    @include font.font-size(24, 24);

    margin-bottom: 16px;

    @include mediaQuery.media {
      @include font.font-size(16, 24);

      margin-bottom: 8px;
    }
  }

  &__description {
    display: inline-flex;
    gap: 8px;
    align-items: center;
  }

  &__icon {
    width: 16px;
    height: 16px;
  }
}
</style>
