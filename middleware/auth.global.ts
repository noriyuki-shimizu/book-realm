import { callWithNuxt } from '#app'
import type { User } from 'firebase/auth'

/**
 * 認証処理を行うミドルウェア
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const app = useNuxtApp()
  const user: User | null = await getCurrentUser()

  if (!LangUtil.isNull(user)) {
    if (to.path.startsWith('/sign-in')) {
      return callWithNuxt(app, navigateTo, ['/home'])
    }
  } else {
    if (to.meta.auth === false) {
      return
    }

    return callWithNuxt(app, navigateTo, [{
      path: '/sign-in',
      query: {
        redirect: to.fullPath
      }
    }])
  }
})
