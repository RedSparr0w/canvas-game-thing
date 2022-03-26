const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  parserOptions: {
    project: [
      path.resolve(__dirname, './tsconfig.eslint.json'),
      path.resolve(__dirname, './tsconfig.json'),
    ],
    tsconfigRootDir: __dirname,
  },
  extends: ['airbnb-typescript/base'],
  globals: {
    MyApp: 'readonly',
  },
  rules: {
    indent: 'off',
    'max-len': [
      'error', 200, 2, {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-return-assign': ['error', 'except-parens'],
    'no-param-reassign': ['error', { props: false }],
    'no-console': ['error', { allow: ['warn', 'error', 'trace'] }],
    '@typescript-eslint/indent': ['error', 2, { SwitchCase: 1 }],
    '@typescript-eslint/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        enums: 'always-multiline',
        generics: 'always-multiline',
        tuples: 'always-multiline',
      },
    ],
    '@typescript-eslint/lines-between-class-members': ['error', { exceptAfterSingleLine: true }],
    '@typescript-eslint/member-ordering': ['error'],
    'no-alert': 'error',
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
    'array-bracket-newline': ['error', { multiline: true }],
    'comma-dangle': [
      'error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-useless-concat': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],
    curly: 'error',
    'brace-style': 'error',
    semi: 'error',
    'space-before-blocks': ['error', 'always'],
    'keyword-spacing': 'error',
    'no-tabs': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'space-infix-ops': 'error',
    'arrow-spacing': 'error',
    'semi-spacing': 'error',
    'prefer-arrow-callback': 'error',
  },
};
