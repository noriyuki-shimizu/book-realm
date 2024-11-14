<script setup lang="ts">
import { useCommonAuthApiStore } from '@/store/common/auth'
import UserIconSvg from '@/assets/svg/user-icon.svg?component'
import CircleInfoSolidSvg from '@/assets/svg/circle-info-solid.svg?component'
import GearSolidSvg from '@/assets/svg/gear-solid.svg?component'
import RightFromBracketSolidSvg from '@/assets/svg/right-from-bracket-solid.svg?component'

/** Firebase Auth */
const auth = useFirebaseAuth()!

/** Loading Indicator */
const { start, finish } = useLoadingIndicator()

/** CSS Module */
const cssModule = useCssModule('classes')

/** Common Auth API Store */
const commonAuthApiStore = useCommonAuthApiStore()

/**
 * サインアウト
 */
const handleSignOut = async (): Promise<void> => {
  start()
  await commonAuthApiStore.signOut(auth)
  await navigateTo('/sign-in')
  finish()
}
</script>

<template>
  <div :class="cssModule['user-menu']">
    <nav>
      <div :class="cssModule['user-menu__list-container']">
        <ul :class="cssModule['user-menu__list']">
          <li>
            <NuxtLink :class="cssModule['user-menu__link']" to="/home">
              <UserIconSvg :class="cssModule['user-menu__icon']" />
              <span>マイページ（開発中）</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :class="cssModule['user-menu__link']" to="/home">
              <CircleInfoSolidSvg :class="cssModule['user-menu__icon']" />
              <span>お知らせ（開発中）</span>
            </NuxtLink>
          </li>
        </ul>
        <ul :class="cssModule['user-menu__list']">
          <li>
            <NuxtLink :class="cssModule['user-menu__link']" to="/home">
              <GearSolidSvg :class="cssModule['user-menu__icon']" />
              <span>設定（開発中）</span>
            </NuxtLink>
          </li>
          <li>
            <button :class="cssModule['user-menu__link']" @click="handleSignOut">
              <RightFromBracketSolidSvg :class="cssModule['user-menu__icon']" />
              <span>ログアウト</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
