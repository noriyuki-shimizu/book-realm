<script setup lang="ts">
import type { User } from 'firebase/auth'
import type { Props } from './types'
import { DELETE_BOOK_MODAL_TRIGGER_ID } from './constants'
import { formatNumberWithCommas, padZero } from '@/filter/number'
import { LangUtil } from '#shared/utils/core'
import TrashCanSolidSvg from '@/assets/svg/trash-can-solid.svg?component'
import type { BookListViewData } from '@/types/business/book/viewData'
import { useApiStore } from '@/store/page/users/books/managements'

/** Props */
const props = defineProps<Props>()

/** Emits */
const emit = defineEmits<{
  (e: 'refreshBookFetch'): void
}>()

/** User */
const user: User | null = await getCurrentUser()

/** API Store */
const apiStore = useApiStore()

if (LangUtil.isNull(user)) {
  throw createError('Not logged in.')
}

/** CSS Module */
const cssModule = useCssModule('classes')

/** Loading Indicator */
const { start, finish } = useLoadingIndicator()

/** 選択中の書籍 */
const selectedBook = ref<BookListViewData | null>(null)

/**
 * 選択中の書籍を設定する
 */
const setSelectedBook = (book: BookListViewData): void => {
  selectedBook.value = book
}

/**
 * 確認モーダルより、削除が実行された際の処理
 */
const onConfirmedDeleteBookSubmit = async (): Promise<void> => {
  if (!LangUtil.isUndefined(selectedBook.value?.id)) {
    start()
    await apiStore.deleteBookAll(user.uid, selectedBook.value.id).finally(() => {
      finish()
    })
    emit('refreshBookFetch')
  }
}
</script>

<template>
  <div>
    <table :class="cssModule['book-table']">
      <thead>
        <tr>
          <th :class="cssModule['book-table__head-cell']" scope="col">書籍名</th>
          <th :class="cssModule['book-table__head-cell']" scope="col">著者</th>
          <th :class="cssModule['book-table__head-cell']" scope="col">価格</th>
          <th :class="cssModule['book-table__head-cell']" scope="col">出版社</th>
          <th :class="cssModule['book-table__head-cell']" scope="col">出版日</th>
          <th :class="cssModule['book-table__head-cell']" scope="col">作成日</th>
          <th :class="cssModule['book-table__head-cell']" scope="col">更新日</th>
          <th :class="cssModule['book-table__head-cell']" scope="col">削除</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="d in props.data" :key="d.id">
          <tr>
            <td :class="cssModule['book-table__body-cell']">
              {{ d.title }}
            </td>
            <td :class="cssModule['book-table__body-cell']">
              <template v-if="LangUtil.isNull(d.author)">---</template>
              <template v-else>{{ d.author }}</template>
            </td>
            <td :class="cssModule['book-table__body-cell']">
              <template v-if="LangUtil.isEmpty(d.price)">---</template>
              <template v-else>
                <span :class="cssModule['book-table__text--number']">{{ formatNumberWithCommas(d.price ?? 0) }}</span>
              </template>
              <span :class="cssModule['book-table__currency-symbol']">円</span>
            </td>
            <td :class="cssModule['book-table__body-cell']">
              <template v-if="LangUtil.isEmpty(d.publisher)">---</template>
              <template v-else>{{ d.publisher }}</template>
            </td>
            <td :class="cssModule['book-table__body-cell']">
              <template v-if="LangUtil.isNull(d.publishedDate)">---</template>
              <template v-else>
                <span :class="cssModule['book-table__text--number']">{{ d.publishedDate.year }}</span
                ><span>年</span><span :class="cssModule['book-table__text--number']">{{ padZero(d.publishedDate.month) }}</span
                ><span>月</span><span :class="cssModule['book-table__text--number']">{{ padZero(d.publishedDate.day) }}</span
                ><span>日</span>
              </template>
            </td>
            <td :class="cssModule['book-table__body-cell']">
              <template v-if="LangUtil.isNull(d.createdAt)">---</template>
              <template v-else>
                <span :class="cssModule['book-table__text--number']">{{ d.createdAt.year }}</span
                ><span>年</span><span :class="cssModule['book-table__text--number']">{{ padZero(d.createdAt.month) }}</span
                ><span>月</span><span :class="cssModule['book-table__text--number']">{{ padZero(d.createdAt.day) }}</span
                ><span>日</span>
              </template>
            </td>
            <td :class="cssModule['book-table__body-cell']">
              <template v-if="LangUtil.isNull(d.updatedAt)">---</template>
              <template v-else>
                <span :class="cssModule['book-table__text--number']">{{ d.updatedAt.year }}</span
                ><span>年</span><span :class="cssModule['book-table__text--number']">{{ padZero(d.updatedAt.month) }}</span
                ><span>月</span><span :class="cssModule['book-table__text--number']">{{ padZero(d.updatedAt.day) }}</span
                ><span>日</span>
              </template>
            </td>
            <td :class="cssModule['book-table__body-cell']">
              <UiPartsGeneralBasicButton
                :class="cssModule['book-table__button']"
                type="button"
                color="danger"
                :data-open-trigger="DELETE_BOOK_MODAL_TRIGGER_ID"
                @click="setSelectedBook(d)"
              >
                <TrashCanSolidSvg :class="cssModule['book-table__icon']" role="img" :aria-label="`${d.title}を削除する`" />
              </UiPartsGeneralBasicButton>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <UiPartsFeedbackModal :trigger-id="DELETE_BOOK_MODAL_TRIGGER_ID">
      <template #header>
        <h2 :class="cssModule['modal__title']">書籍を削除</h2>
      </template>
      <template #desc>
        <p>
          <span :class="cssModule['modal__desc-text--bold']">{{ selectedBook?.title }}</span
          >を削除します。<br />
          よろしいですか？
        </p>
      </template>
      <template #footer>
        <div :class="cssModule['modal__footer']">
          <UiPartsGeneralBasicButton type="button" color="normal" :data-close-trigger="DELETE_BOOK_MODAL_TRIGGER_ID"
            >キャンセル</UiPartsGeneralBasicButton
          >
          <UiPartsGeneralBasicButton
            type="button"
            color="danger"
            :data-close-trigger="DELETE_BOOK_MODAL_TRIGGER_ID"
            @click="onConfirmedDeleteBookSubmit"
            >削除する</UiPartsGeneralBasicButton
          >
        </div>
      </template>
    </UiPartsFeedbackModal>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
