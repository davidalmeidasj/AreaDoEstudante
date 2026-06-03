import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import boundaries from 'eslint-plugin-boundaries'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'public/mockServiceWorker.js']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: { boundaries },
    settings: {
      // Resolve os aliases @/ @features/ @shared/ a partir do tsconfig
      'import/resolver': {
        typescript: { project: './tsconfig.app.json' },
      },
      // Classifica cada arquivo em uma "camada" pela pasta
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'feature', pattern: 'src/features/*/**', capture: ['featureName'] },
        { type: 'root', pattern: 'src/*', mode: 'file' },
      ],
      'boundaries/ignore': ['src/test/**', '**/*.test.{ts,tsx}'],
    },
    rules: {
      // REGRA DE DEPENDÊNCIA (screaming architecture), sintaxe v6 (boundaries/dependencies):
      // shared nunca importa features; uma feature só importa shared + ela mesma; app importa tudo.
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          message: 'Viola a regra de dependência da arquitetura (screaming architecture)',
          rules: [
            { from: { type: 'shared' }, allow: { to: { type: 'shared' } } },
            { from: { type: 'feature' }, allow: { to: { type: 'shared' } } },
            {
              // uma feature só pode importar dela mesma (mesmo featureName)
              from: { type: 'feature' },
              allow: {
                to: {
                  type: 'feature',
                  captured: { featureName: '{{ from.captured.featureName }}' },
                },
              },
            },
            { from: { type: 'app' }, allow: { to: { type: ['shared', 'feature', 'app'] } } },
            {
              from: { type: 'root' },
              allow: { to: { type: ['shared', 'feature', 'app', 'root'] } },
            },
          ],
        },
      ],
    },
  },
  // Testes e setup: habilita os globals do Vitest (globals: true no vite.config)
  {
    files: ['**/*.test.{ts,tsx}', 'src/test/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      // Utilitários de teste exportam funções, não componentes
      'react-refresh/only-export-components': 'off',
    },
  },
  // Desliga regras de formatação que conflitam com o Prettier (deve ser o último)
  prettier,
])
