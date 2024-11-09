<script setup lang="ts">
import type { ViewData } from './types'
import { formatNumberWithCommas, padZero } from '@/filter/number'
import { useApiStore } from '@/store/page'

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
  <div :class="cssModule['analysis-list']">
    <template v-if="!(LangUtil.isNull(bookBulkAnalysisPostResponse) || LangUtil.isNull(bookBulkAnalysisPostResponse.data))">
      <template v-for="data in viewData" :key="data.uid">
        <ul :class="cssModule['analysis-list__container']">
          <li :class="cssModule['analysis-list__item']">
            <span :class="[cssModule['analysis-list__title'], cssModule['analysis-list__title--first']]">書籍名</span>
            <span :class="cssModule['analysis-list__text']">{{ data.title }}</span>
          </li>
          <li :class="cssModule['analysis-list__item']">
            <span :class="cssModule['analysis-list__title']">著者</span>
            <span :class="cssModule['analysis-list__text']">
              <template v-if="LangUtil.isNull(data.author)">---</template>
              <template v-else>{{ data.author }}</template>
            </span>
          </li>
          <li :class="cssModule['analysis-list__item']">
            <span :class="cssModule['analysis-list__title']">価格</span>
            <div :class="cssModule['analysis-list__text']">
              <template v-if="LangUtil.isNull(data.price)">---</template>
              <template v-else>
                <span :class="cssModule['analysis-list--number']">{{ formatNumberWithCommas(data.price) }}</span>
              </template>
              <span :class="cssModule['analysis-list__currency-symbol']">円</span>
            </div>
          </li>
          <li :class="cssModule['analysis-list__item']">
            <span :class="cssModule['analysis-list__title']">出版社</span>
            <span :class="cssModule['analysis-list__text']">
              <template v-if="LangUtil.isNull(data.publisher)">---</template>
              <template v-else>{{ data.publisher }}</template>
            </span>
          </li>
          <li :class="cssModule['analysis-list__item']">
            <span :class="[cssModule['analysis-list__title'], cssModule['analysis-list__title--last']]">出版日</span>
            <div :class="cssModule['analysis-list__text']">
              <template v-if="LangUtil.isNull(data.publishedDate)">---</template>
              <template v-else>
                <span :class="cssModule['analysis-list--number']">{{
                  data.publishedDate.year
                }}</span><span>年</span><span :class="cssModule['analysis-list--number']">{{
                  padZero(data.publishedDate.month)
                }}</span><span>月</span><span :class="cssModule['analysis-list--number']">{{
                  padZero(data.publishedDate.day)
                }}</span><span>日</span>
              </template>
            </div>
          </li>
        </ul>
      </template>
    </template>
    <template v-else>
      <p>解析結果がありません。</p>
    </template>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
