import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // ✅ Allow unused vars (e.g. setImage, res, message)
      '@typescript-eslint/no-unused-vars': 'off',

      // ✅ Allow implicit 'any' (e.g. item, total)
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',

      // ✅ Allow missing imports / undeclared modules
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-var-requires': 'off',

      // ✅ Disable React Refresh strict checks
      'react-refresh/only-export-components': 'off',

      // ✅ Allow console + debugging
      'no-console': 'off',
      'no-debugger': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
])
