<script setup lang="ts">
import type { ViewData } from './types'
import { formatNumberWithCommas, padZero } from '@/filter/number'
import { useApiStore } from '@/store/page'

/** API Store Param */
const { bookBulkAnalysisPostResponse } = useApiStore()

/** View Data */
const viewData = computed<ViewData>(() => {
  const data = bookBulkAnalysisPostResponse.value?.data
  if (LangUtil.isNil(data)) {
    return []
  }
  return data.map((d) => {
    return {
      ...d,
      publishedDate: DateUtil.parseDateString(d.publishedDate)
    }
  })
})

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['analysis-table']">
    <template v-if="!LangUtil.isNull(bookBulkAnalysisPostResponse) && !LangUtil.isNull(bookBulkAnalysisPostResponse.data)">
      <table :class="[cssModule['container__analysis-table'], cssModule['analysis-table__body']]">
        <caption :class="cssModule['analysis-table__caption']">
          <UiPartsFeedbackAlert type="success">ファイルの解析が完了しました。</UiPartsFeedbackAlert>
        </caption>
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
              <td :class="cssModule['analysis-table__body-cell']">{{ data.title }}</td>
              <td :class="cssModule['analysis-table__body-cell']">{{ data.author }}</td>
              <td :class="cssModule['analysis-table__body-cell']">
                <span :class="cssModule['analysis-table__text--number']">{{ formatNumberWithCommas(data.price) }}</span><span>円</span>
              </td>
              <td :class="cssModule['analysis-table__body-cell']">{{ data.publisher }}</td>
              <td :class="cssModule['analysis-table__body-cell']">
                <span :class="cssModule['analysis-table__text--number']">{{
                  data.publishedDate.year
                }}</span><span>年</span><span :class="cssModule['analysis-table__text--number']">{{
                  padZero(data.publishedDate.month)
                }}</span><span>月</span><span :class="cssModule['analysis-table__text--number']">{{
                  padZero(data.publishedDate.day)
                }}</span><span>日</span>
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
