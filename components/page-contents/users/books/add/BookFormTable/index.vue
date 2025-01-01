<script setup lang="ts">
import { useApiStore, useUiStore } from '@/store/page/users/books/add'
import TrashCanSolidSvg from '@/assets/svg/trash-can-solid.svg?component'
import {
  TITLE_AREA_LABEL_ID,
  AUTHOR_AREA_LABEL_ID,
  PRICE_AREA_LABEL_ID,
  PUBLISHER_AREA_LABEL_ID,
  PUBLISHED_DATE_AREA_LABEL_ID
} from '@/constants/components/form/book'

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
  <table :class="cssModule['book-form-table']">
    <thead>
      <tr>
        <th :class="cssModule['book-form-table__head-cell']" scope="col">
          <div :class="cssModule['book-form-table__head-title']">
            <span>書籍名</span>
            <UiPartsDataDisplayTag color="red">必須</UiPartsDataDisplayTag>
          </div>
        </th>
        <th :class="cssModule['book-form-table__head-cell']" scope="col">著者</th>
        <th :class="cssModule['book-form-table__head-cell']" scope="col">価格</th>
        <th :class="cssModule['book-form-table__head-cell']" scope="col">出版社</th>
        <th :class="cssModule['book-form-table__head-cell']" scope="col">出版日</th>
        <th :class="[cssModule['book-form-table__head-cell'], cssModule['book-form-table__head-cell--center']]" scope="col">削除</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="({ state, validation }, index) in formData" :key="`formTable${index}`">
        <tr>
          <td :class="cssModule['book-form-table__body-cell']">
            <UiPartsDataEntryInputText
              :id="`title-${index}`"
              v-model="state.title"
              :class="cssModule['book-form-table__input']"
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
          </td>
          <td :class="cssModule['book-form-table__body-cell']">
            <UiPartsDataEntryInputText
              :id="`author-${index}`"
              v-model="state.author"
              :class="cssModule['book-form-table__input']"
              name="author"
              size="small"
              type="text"
              :aria-describedby="`${AUTHOR_AREA_LABEL_ID}-${index}`"
              :is-error="validation.author?.success === false"
            />
          </td>
          <td :class="cssModule['book-form-table__body-cell']">
            <UiPartsDataEntryInputText
              :id="`price-${index}`"
              v-model="state.price"
              :class="cssModule['book-form-table__input']"
              name="price"
              size="small"
              type="text"
              :aria-describedby="`${PRICE_AREA_LABEL_ID}-${index}`"
              :is-error="validation.price?.success === false"
            />
          </td>
          <td :class="cssModule['book-form-table__body-cell']">
            <UiPartsDataEntryInputText
              :id="`publisher-${index}`"
              v-model="state.publisher"
              :class="cssModule['book-form-table__input']"
              name="publisher"
              size="small"
              type="text"
              :aria-describedby="`${PUBLISHER_AREA_LABEL_ID}-${index}`"
              :is-error="validation.publisher?.success === false"
            />
          </td>
          <td :class="cssModule['book-form-table__body-cell']">
            <UiPartsDataEntryInputText
              :id="`publishedDate-${index}`"
              v-model="state.publishedDate"
              name="publishedDate"
              size="small"
              type="text"
              :class="cssModule['book-form-table__input']"
              :aria-describedby="`${PUBLISHED_DATE_AREA_LABEL_ID}-${index}`"
              :is-error="validation.publishedDate?.success === false"
            />
            <p :id="`${PUBLISHED_DATE_AREA_LABEL_ID}-${index}`" :class="cssModule['book-form-table__description']">例）1970.01.01</p>
          </td>
          <td :class="[cssModule['book-form-table__body-cell'], cssModule['book-form-table__body-cell--center']]">
            <UiPartsGeneralBasicButton
              :class="cssModule['book-form-table__button']"
              type="button"
              color="danger"
              @click="uiStore.removeFormStateRecord(index)"
            >
              <TrashCanSolidSvg :class="cssModule['book-form-table__icon']" role="img" :aria-label="`${index + 1}行目の入力欄を削除する`" />
            </UiPartsGeneralBasicButton>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
