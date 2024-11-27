<script setup lang="ts">
import CircleInfoSolidSvg from '@/assets/svg/circle-info-solid.svg?component'

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <section :class="cssModule['empty-section']">
    <table :class="cssModule['empty-section__table']">
      <thead>
        <tr>
          <th :class="cssModule['empty-section__table-head-cell']" scope="col">書籍名</th>
          <th :class="cssModule['empty-section__table-head-cell']" scope="col">著者</th>
          <th :class="cssModule['empty-section__table-head-cell']" scope="col">価格</th>
          <th :class="cssModule['empty-section__table-head-cell']" scope="col">出版社</th>
          <th :class="cssModule['empty-section__table-head-cell']" scope="col">出版日</th>
          <th :class="cssModule['empty-section__table-head-cell']" scope="col">作成日</th>
          <th :class="cssModule['empty-section__table-head-cell']" scope="col">更新日</th>
        </tr>
      </thead>
    </table>
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
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
