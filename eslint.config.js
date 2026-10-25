const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    files: ['eslint.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    files: ['app.js'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'error',
    },
  },
];
