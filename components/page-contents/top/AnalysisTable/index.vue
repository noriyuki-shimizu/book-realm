<script setup lang="ts">
import type { ViewData } from './types'
import { formatNumberWithCommas, padZero } from '@/filter/number'
import { useApiStore } from '@/store/page'
import { DateUtil, LangUtil } from '#shared/utils/core'

/** API Store */
const apiStore = useApiStore()

/** API Store Reactive Param */
const { bookBulkAnalysisPostResponse } = storeToRefs(apiStore)

/** View Data */
const viewData = computed<ViewData>(() => {
  const data = bookBulkAnalysisPostResponse.value?.data
  if (LangUtil.isNil(data)) {
    return []
  }
  return data.map((d) => {
    const { uid, title, author, price, publisher, publishedDate } = d
    return {
      uid,
      title,
      author,
      price,
      publisher,
      publishedDate: LangUtil.isNull(publishedDate) ? null : DateUtil.parseDotSeparatedDate(publishedDate)
    }
  })
})

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['analysis-table']">
    <template v-if="!(LangUtil.isNull(bookBulkAnalysisPostResponse) || LangUtil.isNull(bookBulkAnalysisPostResponse.data))">
      <table :class="cssModule['analysis-table__body']">
        <thead>
          <tr>
            <th :class="cssModule['analysis-table__head-cell']" scope="col">書籍名</th>
            <th :class="cssModule['analysis-table__head-cell']" scope="col">著者</th>
            <th :class="cssModule['analysis-table__head-cell']" scope="col">価格</th>
            <th :class="cssModule['analysis-table__head-cell']" scope="col">出版社</th>
            <th :class="cssModule['analysis-table__head-cell']" scope="col">出版日</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="data in viewData" :key="data.uid">
            <tr>
              <td :class="cssModule['analysis-table__body-cell']">
                {{ data.title }}
              </td>
              <td :class="cssModule['analysis-table__body-cell']">
                <template v-if="LangUtil.isNull(data.author)">---</template>
                <template v-else>{{ data.author }}</template>
              </td>
              <td :class="cssModule['analysis-table__body-cell']">
                <template v-if="LangUtil.isNull(data.price)">---</template>
                <template v-else>
                  <span :class="cssModule['analysis-table__text--number']">{{ formatNumberWithCommas(data.price) }}</span>
                </template>
                <span :class="cssModule['analysis-table__currency-symbol']">円</span>
              </td>
              <td :class="cssModule['analysis-table__body-cell']">
                <template v-if="LangUtil.isNull(data.publisher)">---</template>
                <template v-else>{{ data.publisher }}</template>
              </td>
              <td :class="cssModule['analysis-table__body-cell']">
                <template v-if="LangUtil.isNull(data.publishedDate)">---</template>
                <template v-else>
                  <span :class="cssModule['analysis-table__text--number']">{{ data.publishedDate.year }}</span
                  ><span>年</span><span :class="cssModule['analysis-table__text--number']">{{ padZero(data.publishedDate.month) }}</span
                  ><span>月</span><span :class="cssModule['analysis-table__text--number']">{{ padZero(data.publishedDate.day) }}</span
                  ><span>日</span>
                </template>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>
    <template v-else>
      <p>解析結果がありません。</p>
    </template>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
