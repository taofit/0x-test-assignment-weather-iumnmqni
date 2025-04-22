import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            sourceType: 'module',
            ecmaVersion: 2021,
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            '@typescript-eslint': ts,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...ts.configs.recommended.rules,
            'react/prop-types': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];