<script setup lang="ts">
import { useApiStore, useUiStore } from '@/store/page/users/books/add'
import {
  TITLE_AREA_LABEL_ID,
  AUTHOR_AREA_LABEL_ID,
  PRICE_AREA_LABEL_ID,
  PUBLISHER_AREA_LABEL_ID,
  PUBLISHED_DATE_AREA_LABEL_ID
} from '@/constants/components/form/book'
import TrashCanSolidSvg from '@/assets/svg/trash-can-solid.svg?component'

/** API Store */
const apiStore = useApiStore()

/** CSS Module */
const cssModule = useCssModule('classes')

/** API Store Reactive Param */
const { bookTitles } = storeToRefs(apiStore)

/** UI Store Param */
const uiStore = useUiStore()

/** UI Store Reactive Param */
const { formData, duplicateTitleIndexList } = storeToRefs(uiStore)
</script>

<template>
  <div :class="[cssModule['book-form-container__book-form-list'], cssModule['book-form-list']]">
    <template v-for="({ state, validation }, index) in formData" :key="`formTable${index}`">
      <details :class="cssModule['book-form-list__accordion']">
        <summary :class="cssModule['book-form-list__summary']">
          <div :class="cssModule['book-form-list__summary-content']">
            <div :class="cssModule['book-form-list__title-container']">
              <div :class="cssModule['book-form-list__title']">
                <span :class="cssModule['book-form-list__title-text']">書籍名</span>
                <UiPartsDataDisplayTag color="red">必須</UiPartsDataDisplayTag>
              </div>
              <UiPartsGeneralBasicButton
                :class="cssModule['book-form-list__button']"
                type="button"
                size="medium"
                color="danger"
                @click="uiStore.removeFormStateRecord(index)"
              >
                <TrashCanSolidSvg :class="cssModule['book-form-list__icon']" />
              </UiPartsGeneralBasicButton>
            </div>
            <UiPartsDataEntryInputText
              :id="`title-${index}`"
              v-model="state.title"
              :class="cssModule['book-form-list__input']"
              name="title"
              size="small"
              type="text"
              required
              :aria-describedby="`${TITLE_AREA_LABEL_ID}-${index}`"
              :is-error="validation.title?.success === false"
            />
            <UiPartsFeedbackAlert
              v-if="bookTitles.includes(state.title)"
              :id="`${TITLE_AREA_LABEL_ID}-${index}`"
              type="warning"
              size="small"
              role="alert"
              aria-live="assertive"
            >
              こちらの書籍は既に登録されています。
            </UiPartsFeedbackAlert>
            <UiPartsFeedbackAlert
              v-else-if="duplicateTitleIndexList.includes(index)"
              :id="`${TITLE_AREA_LABEL_ID}-${index}`"
              type="warning"
              size="small"
              role="alert"
              aria-live="assertive"
            >
              こちらは既に入力されています。
            </UiPartsFeedbackAlert>
          </div>
          <div :class="cssModule['book-form-list__chevron']"></div>
        </summary>
        <div :class="cssModule['book-form-list__detail']">
          <div :class="cssModule['book-form-list__input-item']">
            <span :class="cssModule['book-form-list__title-text']">著者</span>
            <UiPartsDataEntryInputText
              :id="`author-${index}`"
              v-model="state.author"
              :class="cssModule['book-form-list__input']"
              name="author"
              size="small"
              type="text"
              :aria-describedby="`${AUTHOR_AREA_LABEL_ID}-${index}`"
              :is-error="validation.author?.success === false"
            />
          </div>
          <div :class="cssModule['book-form-list__input-item']">
            <span :class="cssModule['book-form-list__title-text']">価格</span>
            <UiPartsDataEntryInputText
              :id="`price-${index}`"
              v-model="state.price"
              :class="cssModule['book-form-list__input']"
              name="price"
              size="small"
              type="text"
              :aria-describedby="`${PRICE_AREA_LABEL_ID}-${index}`"
              :is-error="validation.price?.success === false"
            />
          </div>
          <div :class="cssModule['book-form-list__input-item']">
            <span :class="cssModule['book-form-list__title-text']">出版社</span>
            <UiPartsDataEntryInputText
              :id="`publisher-${index}`"
              v-model="state.publisher"
              :class="cssModule['book-form-list__input']"
              name="publisher"
              size="small"
              type="text"
              :aria-describedby="`${PUBLISHER_AREA_LABEL_ID}-${index}`"
              :is-error="validation.publisher?.success === false"
            />
          </div>
          <div :class="cssModule['book-form-list__input-item']">
            <span :class="cssModule['book-form-list__title-text']">出版日</span>
            <UiPartsDataEntryInputText
              :id="`publishedDate-${index}`"
              v-model="state.publishedDate"
              :class="cssModule['book-form-list__input']"
              name="publishedDate"
              size="small"
              type="text"
              :aria-describedby="`${PUBLISHED_DATE_AREA_LABEL_ID}-${index}`"
              :is-error="validation.publishedDate?.success === false"
            />
            <p :id="`${PUBLISHED_DATE_AREA_LABEL_ID}-${index}`" :class="cssModule['book-form-list__description']">例）1970.01.01</p>
          </div>
        </div>
      </details>
    </template>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
