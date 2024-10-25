// @ts-check
// @ts-ignore
import eslintConfigPrettier from 'eslint-config-prettier'
import gitignore from 'eslint-config-flat-gitignore'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
import eslintPluginImportX from 'eslint-plugin-import-x'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import { withNuxt } from './.nuxt/eslint.config.mjs'

export default withNuxt([
  gitignore(),
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  eslintConfigPrettier,
  ...pluginVueA11y.configs['flat/recommended'],
  {
    files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      'unused-imports': eslintPluginUnusedImports
    },
    rules: {
      /* eslint */
      'no-restricted-properties': [
        'error',
        {
          property: '$children',
          message: '廃止されたプロパティです'
        },
        {
          property: '$destroy',
          message: '廃止されたメソッドです'
        }
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'vue',
              importNames: ['default'],
              message: '名前付きImportを使用してください'
            }
          ],
          patterns: [
            {
              group: ['**/*.vue'],
              allowImportNames: ['default'],
              message: 'default export を使用してください'
            },
            {
              group: ['@/composables/*', '@/utils/*'],
              message: '自動 import 対象になるので、明示的に import する必要はありません'
            }
          ]
        }
      ],
      /* import */
      'import/first': 'off',
      'import/no-self-import': 'off',
      /* eslint-plugin-import-x */
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'index', 'parent', 'sibling', 'internal', 'object']
        }
      ],
      'import-x/no-self-import': 'off',
      'import-x/no-unresolved': [2, { ignore: ['\\.mjs', '\\.cjs'] }],
      /* eslint-plugin-unused-imports */
      'unused-imports/no-unused-imports': 'error'
    }
  }
])
