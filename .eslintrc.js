module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    "@typescript-eslint/indent": [0]
  }
}
