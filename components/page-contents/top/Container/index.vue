<script setup lang="ts">
import LightIconSvg from '@/assets/svg/light-icon.svg?component'
import SearchIconSvg from '@/assets/svg/search-icon.svg?component'
import { StatusCode } from '@/enums/common/http/statusCode'
import AnalysisList from '../AnalysisList/index.vue'
import AnalysisTable from '../AnalysisTable/index.vue'
import DescriptionSection from '../DescriptionSection/index.vue'
import PictureForm from '../PictureForm/index.vue'
import { useApiStore } from '@/store/page'

/** API Store Param */
const { bookBulkAnalysisPostResponse } = useApiStore()

/** CSS Module */
const cssModule = useCssModule('classes')
</script>

<template>
  <div :class="cssModule['container']">
    <h1 :class="cssModule['container__title']">BOOK Realm で書籍管理をしませんか？</h1>

    <DescriptionSection :class="cssModule['container__description-section']">
      <template #icon>
        <LightIconSvg :class="cssModule['container__icon']" />
      </template>
      <template #title>機能を試してみる</template>
      <template #default>
        本アプリケーションの１つ機能として、画像から書籍を解析できます。<br>
        解析結果の正当性は保証されませんが、問題ある場合は書籍がより正確に映った画像を読み込んでください。
      </template>
    </DescriptionSection>

    <UiPartsFeedbackAlert
      v-if="
        !LangUtil.isNull(bookBulkAnalysisPostResponse) &&
        !LangUtil.isNull(bookBulkAnalysisPostResponse.error) &&
        bookBulkAnalysisPostResponse.error.statusCode !== StatusCode.STATUS_CODE_BAD_REQUEST
      "
      :class="cssModule['container__analysis-text']"
      type="error"
    >
      <pre>{{ bookBulkAnalysisPostResponse.error.message }}</pre>
      <pre>{{ bookBulkAnalysisPostResponse.error.name }}</pre>
      <pre>{{ bookBulkAnalysisPostResponse.error.statusCode }}</pre>
      <pre>{{ bookBulkAnalysisPostResponse.error.stack }}</pre>
    </UiPartsFeedbackAlert>

    <UiPartsFeedbackAlert
      v-if="
        !LangUtil.isNull(bookBulkAnalysisPostResponse) &&
        !LangUtil.isNull(bookBulkAnalysisPostResponse.error) &&
        bookBulkAnalysisPostResponse.error.statusCode === StatusCode.STATUS_CODE_BAD_REQUEST
      "
      :class="cssModule['container__analysis-text']"
      type="error"
    >
      ファイルの解析に失敗しました。書籍が正しく写されているか確認してください。
    </UiPartsFeedbackAlert>
    <UiPartsFeedbackAlert
      v-if="!LangUtil.isNull(bookBulkAnalysisPostResponse) && !LangUtil.isNull(bookBulkAnalysisPostResponse.data)"
      :class="cssModule['container__analysis-text']"
      type="success"
    >
      ファイルの解析が完了しました。解析結果は画面下部に表示されています。
    </UiPartsFeedbackAlert>

    <PictureForm :class="cssModule['container__picture-form']" />

    <DescriptionSection :class="cssModule['container__description-section']">
      <template #icon>
        <SearchIconSvg :class="cssModule['container__icon']" />
      </template>
      <template #title>解析結果</template>
      <template #default>
        ファイルを解析すると、下記に解析結果が表示されます。<br>
        アプリケーションに<span :class="cssModule['container--text-bold']">ログインすると解析結果を登録・編集する</span>ことができます。
      </template>
    </DescriptionSection>

    <UiPartsFeedbackAlert
      v-if="!LangUtil.isNull(bookBulkAnalysisPostResponse) && !LangUtil.isNull(bookBulkAnalysisPostResponse.data)"
      :class="cssModule['container__analysis-text']"
      type="success"
    >
      ファイルの解析が完了しました。
    </UiPartsFeedbackAlert>

    <div :class="cssModule['container__analysis-table-wrapper']">
      <AnalysisTable />
    </div>

    <div :class="cssModule['container__analysis-list-wrapper']">
      <AnalysisList />
    </div>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
