module.exports = {
  env: {
    browser: true,
    webextensions: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended',
    '@vue/prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'no-use-before-define': 'off',
    'no-alert': 'off',
  },
};
