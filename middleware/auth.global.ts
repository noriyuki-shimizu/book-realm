import { useCommonAuthApiStore } from '@/store/common/auth'

/**
 * 認証処理を行うミドルウェア
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const { getters, actions } = useCommonAuthApiStore()
  const { isLoggedIn } = getters
  const { setUser } = actions

  setUser(await getCurrentUser())

  if (isLoggedIn.value) {
    if (to.path.startsWith('/sign-in')) {
      return navigateTo('/home')
    }
  } else {
    if (to.meta.auth === false) {
      return
    }

    return navigateTo({
      path: '/sign-in',
      query: {
        redirect: to.fullPath
      }
    })
  }
})
