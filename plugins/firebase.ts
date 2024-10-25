import { initializeApp } from 'firebase/app'
import type { FirebaseOptions } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  const { public: publicConfig } = useRuntimeConfig()

  if (LangUtil.isEmpty(publicConfig.firebaseApiKey)) {
    throw createError('Firebase Api Key is empty')
  }

  const firebaseConfig: FirebaseOptions = {
    apiKey: publicConfig.firebaseApiKey,
    authDomain: publicConfig.firebaseAuthDomain,
    projectId: publicConfig.firebaseProjectId,
    storageBucket: publicConfig.firebaseStorageBucket,
    messagingSenderId: publicConfig.firebaseMessagingSenderId,
    appId: publicConfig.firebaseAppId
  }

  initializeApp(firebaseConfig)

  const auth = getAuth()
  auth.languageCode = 'ja'

  return {
    provide: {
      auth
    }
  }
})
