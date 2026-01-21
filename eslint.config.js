// ESLint flat config for Next.js 16 + TypeScript (CommonJS)
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({ baseDirectory: __dirname });
const nextCore = compat.extends('next/core-web-vitals').map((c) => ({
  ...c,
  files: ['src/**/*.{ts,tsx,js,jsx}', 'next.config.ts', 'prisma.config.ts'],
}));

module.exports = [
  {
    ignores: ['node_modules/**', '.next/**', 'dist/**', 'coverage/**', '.github/**', 'eslint.config.*', 'prettier.config.*']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextCore,
  {
    files: ['src/**/*.{ts,tsx,js,jsx}', 'next.config.ts', 'prisma.config.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        // Type-aware linting disabled to avoid project requirements in all files
        // If enabling, set "project" and "tsconfigRootDir"
      },
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-var': 'error',
      eqeqeq: 'error',
      'prefer-template': 'error',
      'no-nested-ternary': 'warn',
      'no-magic-numbers': ['warn', { ignoreArrayIndexes: true, enforceConst: true }],
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': true }],
      'import/order': ['warn', { 'newlines-between': 'always' }],
    },
  },
];
