const {
    defineConfig,
} = require('eslint/config');

const tsParser = require('@typescript-eslint/parser');
const globals = require('globals');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const js = require('@eslint/js');

const {
    FlatCompat,
} = require('@eslint/eslintrc');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        parserOptions: {},

        globals: {
            ...globals.node,
        },
    },

    plugins: {
        '@typescript-eslint': typescriptEslint,
    },

    extends: compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),

    rules: {
        '@typescript-eslint/no-unused-vars': ['error', {
            argsIgnorePattern: '^_',
        }],
        quotes: ['error', 'single'],
    },
    ignores: [
        "eslint.config.js",
    ]
}]);
