import viteSvgLoader from 'vite-svg-loader'

/** 本番モードか */
const isProduction = process.env.NODE_ENV === 'production'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/test-utils/module'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja'
      }
    }
  },
  vite: {
    plugins: [viteSvgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern"
        }
      }
    }
  },
  css: ['ress', '@/assets/style/_base.scss'],
  runtimeConfig: {
    googleAiStudioApiKey: '',
    public: {
      isProduction
    }
  },
  plugins: [
    '@/plugins/rest/nuxtServerHttpClient.ts'
  ],
  imports: {
    dirs: [
      'composables/*/index.{ts,js,mjs,mts}',
      'utils/*/index.{ts,js,mjs,mts}'
    ]
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      include: ['../types/lib/index.d.ts'],
      exclude: ['../test/**', '../**/*.spec.ts']
    }
  },
  ignore: [
    'tests/*',
    '**/__screenshots__/*',
    '**/__mock__/*',
    '**/*.{spec,test}.{js,cts,mts,ts,jsx,tsx}',
    '**/*.d.{cts,mts,ts}',
    '**/.{output,git,cache,data}',
    '.nuxt/analyze'
  ]
})
