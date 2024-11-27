<script setup lang="ts">
/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <table :class="cssModule['skeleton-table']">
    <thead>
      <tr>
        <th :class="cssModule['skeleton-table__head-cell']" scope="col">書籍名</th>
        <th :class="cssModule['skeleton-table__head-cell']" scope="col">著者</th>
        <th :class="cssModule['skeleton-table__head-cell']" scope="col">価格</th>
        <th :class="cssModule['skeleton-table__head-cell']" scope="col">出版社</th>
        <th :class="cssModule['skeleton-table__head-cell']" scope="col">出版日</th>
        <th :class="cssModule['skeleton-table__head-cell']" scope="col">作成日</th>
        <th :class="cssModule['skeleton-table__head-cell']" scope="col">更新日</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(_, index) in [...new Array(10)]" :key="`skeleton-table-${index}`">
        <tr>
          <td :class="cssModule['skeleton-table__body-cell']"><div :class="cssModule['skeleton-table__content']" /></td>
          <td :class="cssModule['skeleton-table__body-cell']"><div :class="cssModule['skeleton-table__content']" /></td>
          <td :class="cssModule['skeleton-table__body-cell']"><div :class="cssModule['skeleton-table__content']" /></td>
          <td :class="cssModule['skeleton-table__body-cell']"><div :class="cssModule['skeleton-table__content']" /></td>
          <td :class="cssModule['skeleton-table__body-cell']"><div :class="cssModule['skeleton-table__content']" /></td>
          <td :class="cssModule['skeleton-table__body-cell']"><div :class="cssModule['skeleton-table__content']" /></td>
          <td :class="cssModule['skeleton-table__body-cell']"><div :class="cssModule['skeleton-table__content']" /></td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
