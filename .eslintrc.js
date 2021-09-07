module.exports = {
  env: {
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@fluentui/react'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 8,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'react-hooks'
  ],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    '@typescript-eslint/no-var-requires': 0,
    'react/prop-types': 0,
    'react/display-name': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-console': 'off',
    'react/jsx-no-bind': [ 'error', {
      'ignoreDOMComponents': true,
      'ignoreRefs': true,
      'allowArrowFunctions': true,
      'allowFunctions':true,
      'allowBind': true
    }],
    '@fluentui/ban-imports': 'off',
    'no-debugger': "off",
    
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
