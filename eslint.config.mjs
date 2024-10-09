// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
// @ts-ignore
import eslintConfigPrettier from 'eslint-config-prettier'
import gitignore from 'eslint-config-flat-gitignore'

export default withNuxt([
  gitignore(),
  eslintConfigPrettier
])
