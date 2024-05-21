module.exports = {
    env: {
      browser: true,
      es2020: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      sourceType: 'module',
      project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint', 'import'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': ['warn'],
      '@typescript-eslint/interface-name-prefix': ['off'],
      'import/order': ['warn', { 'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'] }],
    },
    ignorePatterns: ['dist/*'],
  };
  