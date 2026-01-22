import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores([
    '**/dist/**',
    '**/build/**',
    '**/node_modules/**',
    '**/coverage/**',
    '**/.git/**',
    '**/.vscode/**',
    '**/*.md',
    '**/*.json',
    '**/*.css',
    '**/*.scss',
    '**/*.svg',
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.gif',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'import': importPlugin,
      'simple-import-sort': simpleImportSort,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json'],
        },
      },
    },
    rules: {
      // React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // Import sorting
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      
      // Import check
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/export': 'error',
      'import/no-duplicates': 'error',
      
      // Formatting (replaced with prettier)
      // 'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      // 'no-trailing-spaces': 'error',
      // 'eol-last': ['error', 'always'],
      // 'quotes': ['error', 'single', { avoidEscape: true }],
      // 'semi': ['error', 'always'],
      // 'comma-dangle': ['error', 'always-multiline'],
      // 'object-curly-spacing': ['error', 'always'],
      // 'array-bracket-spacing': ['error', 'never'],
      // 'space-in-parens': ['error', 'never'],
      // 'comma-spacing': ['error', { before: false, after: true }],
      // 'keyword-spacing': ['error', { before: true, after: true }],
      // 'space-before-blocks': 'error',
      // 'space-before-function-paren': ['error', {
      //   anonymous: 'always',
      //   named: 'never',
      //   asyncArrow: 'always',
      // }],
      // 'arrow-spacing': ['error', { before: true, after: true }],
      // 'indent': ['error', 2, {
      //   SwitchCase: 1,
      //   ignoredNodes: ['ConditionalExpression'],
      // }],
      
      // TypeScript
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  prettierConfig,
]);