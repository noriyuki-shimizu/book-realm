<script setup lang="ts">
import type { User } from 'firebase/auth'
import type { Props } from './types'
import { formatNumberWithCommas, padZero } from '@/filter/number'
import { LangUtil } from '#shared/utils/core'

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
  <div :class="cssModule['book-list']">
    <template v-for="d in props.data" :key="d.uid">
      <details :class="cssModule['book-list__accordion']">
        <summary :class="cssModule['book-list__summary']">
          <div :class="cssModule['book-list__summary-content']">
            <span :class="cssModule['book-list__title']">書籍名</span>
            <span :class="cssModule['book-list__content']">{{ d.title }}</span>
          </div>
          <div :class="cssModule['book-list__chevron']"></div>
        </summary>
        <div :class="cssModule['book-list__detail']">
          <div :class="cssModule['book-list__detail-item']">
            <span :class="cssModule['book-list__title']">著者</span>
            <div :class="cssModule['book-list__content']">
              <template v-if="LangUtil.isEmpty(d.author)">---</template>
              <template v-else>{{ d.author }}</template>
            </div>
          </div>
          <div :class="cssModule['book-list__detail-item']">
            <span :class="cssModule['book-list__title']">価格</span>
            <div :class="cssModule['book-list__content']">
              <template v-if="LangUtil.isEmpty(d.price)">---</template>
              <template v-else>
                <span :class="cssModule['book-list__text--number']">{{ formatNumberWithCommas(d.price ?? 0) }}</span>
              </template>
              <span :class="cssModule['book-list__currency-symbol']">円</span>
            </div>
          </div>
          <div :class="cssModule['book-list__detail-item']">
            <span :class="cssModule['book-list__title']">出版社</span>
            <div :class="cssModule['book-list__content']">
              <template v-if="LangUtil.isEmpty(d.publisher)">---</template>
              <template v-else>{{ d.publisher }}</template>
            </div>
          </div>
          <div :class="cssModule['book-list__detail-item']">
            <span :class="cssModule['book-list__title']">出版日</span>
            <div :class="cssModule['book-list__content']">
              <template v-if="LangUtil.isNull(d.publishedDate)">---</template>
              <template v-else>
                <span :class="cssModule['book-list__text--number']">{{ d.publishedDate.year }}</span
                ><span>年</span><span :class="cssModule['book-list__text--number']">{{ padZero(d.publishedDate.month) }}</span
                ><span>月</span><span :class="cssModule['book-list__text--number']">{{ padZero(d.publishedDate.day) }}</span
                ><span>日</span>
              </template>
            </div>
          </div>
          <div :class="cssModule['book-list__detail-item']">
            <span :class="cssModule['book-list__title']">作成日</span>
            <div :class="cssModule['book-list__content']">
              <template v-if="LangUtil.isNull(d.createdAt)">---</template>
              <template v-else>
                <span :class="cssModule['book-list__text--number']">{{ d.createdAt.year }}</span
                ><span>年</span><span :class="cssModule['book-list__text--number']">{{ padZero(d.createdAt.month) }}</span
                ><span>月</span><span :class="cssModule['book-list__text--number']">{{ padZero(d.createdAt.day) }}</span
                ><span>日</span>
              </template>
            </div>
          </div>
          <div :class="cssModule['book-list__detail-item']">
            <span :class="cssModule['book-list__title']">更新日</span>
            <div :class="cssModule['book-list__content']">
              <template v-if="LangUtil.isNull(d.updatedAt)">---</template>
              <template v-else>
                <span :class="cssModule['book-list__text--number']">{{ d.updatedAt.year }}</span
                ><span>年</span><span :class="cssModule['book-list__text--number']">{{ padZero(d.updatedAt.month) }}</span
                ><span>月</span><span :class="cssModule['book-list__text--number']">{{ padZero(d.updatedAt.day) }}</span
                ><span>日</span>
              </template>
            </div>
          </div>
        </div>
      </details>
    </template>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
