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
  build: {
    transpile: [
      ...(isProduction ? ['dayjs'] : [])
    ]
  },
  vite: {
    plugins: [viteSvgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern"
        }
      }
    },
    vue: {
      template: {
        // MEMO: https://github.com/vitejs/vite/issues/636
        compilerOptions: {
          nodeTransforms: [
            (node) => {
              if (isProduction && node.type === 1) {
                for (let i = 0; i < node.props.length; i++) {
                  const p = node.props[i]
                  if (p && p.type === 6 && p.name === 'data-testid') {
                    node.props.splice(i, 1)
                    i--
                  }
                }
              }
            }
          ]
        }
      }
    }
  },
  nitro: {
    preset: 'vercel',
    vercel: {
      functions: {
        maxDuration: 60
      }
    }
  },
  css: ['ress', '@/assets/style/_base.scss'],
  runtimeConfig: {
    googleAiStudioApiKey: '',
    public: {
      isProduction,
      pageBaseUrl: '',
      logLevel: isProduction ? 3 : 5,
      firebaseApiKey: '',
      firebaseAuthDomain: '',
      firebaseProjectId: '',
      firebaseStorageBucket: '',
      firebaseMessagingSenderId: '',
      firebaseAppId: ''
    }
  },
  plugins: [
    { order: 0, mode: 'all', src: '@/plugins/rest/nuxtServerHttpClient.ts' },
    { order: 99, mode: 'client', src: '@/plugins/vercel.client.ts' },
    { order: 99, mode: 'all', src: '@/plugins/globalErrorHandler.ts' }
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
