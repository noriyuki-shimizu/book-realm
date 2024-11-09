<script setup lang="ts">
import type { User } from 'firebase/auth';
import IconLink from '../IconLink/index.vue'
import { useCommonAuthApiStore } from '@/store/common/auth'
import UserIconSvg from '@/assets/svg/user-icon.svg?component'

/** Firebase Auth */
const auth = useFirebaseAuth()!

/** Loading Indicator */
const { start, finish } = useLoadingIndicator()

/** CSS Module */
const cssModule = useCssModule('classes')

/** Common Auth API Store */
const commonAuthApiStore = useCommonAuthApiStore()

/** Login User */
const user: User | null = await getCurrentUser()

if (LangUtil.isNull(user)) {
  throw createError('User data is null.')
}

/** アイコンナビゲーションが開かれているか */
const isIconNavigateOpen = ref<boolean>(false)

/**
 * アイコンナビゲーションの開閉
 */
const toggleIconNavigate = (): void => {
  isIconNavigateOpen.value = !isIconNavigateOpen.value
}

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
  <div :class="cssModule['header-content']">
    <IconLink />
    <div :class="cssModule['header-content__navigate']">
      <button type="button" :class="cssModule['header-content__button']" @click="toggleIconNavigate">
        <template v-if="LangUtil.isNull(user.photoURL)">
          <div :class="cssModule['header-content__user-icon-wrapper']">
            <UserIconSvg role="img" aria-label="ユーザーメニューを開くアイコン" :class="cssModule['header-content__user-icon']" />
          </div>
        </template>
        <template v-else>
          <img
            :class="cssModule['header-content__user-icon-img']"
            :src="user.photoURL"
            alt="ユーザーメニューを開くアイコン"
            loading="lazy"
            decoding="async"
          />
        </template>
      </button>
      <div v-show="isIconNavigateOpen" :class="[cssModule['header-content__menu'], cssModule['menu']]">
        <nav>
          <ul>
            <li>
              <button type="button" @click="handleSignOut">
                <span>ログアウト</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style module="classes" lang="scss">
@use './style.scss';
</style>
