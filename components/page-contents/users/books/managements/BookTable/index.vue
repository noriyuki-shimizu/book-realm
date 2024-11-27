<script setup lang="ts">
import type { User } from 'firebase/auth'
import type { Props } from './types'
import { formatNumberWithCommas, padZero } from '@/filter/number'

/** Props */
const props = defineProps<Props>()

/** User */
const user: User | null = await getCurrentUser()

if (LangUtil.isNull(user)) {
  throw createError('Not logged in.')
}

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
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
      </tr>
    </thead>
    <tbody>
      <template v-for="d in props.data" :key="d.uid">
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
            <template v-if="LangUtil.isNull(d.publisher)">---</template>
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
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
