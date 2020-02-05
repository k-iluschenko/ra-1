module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'import', 'jsx-a11y', 'fetch'],
  extends: 'airbnb',
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/extensions': ['error', 'ignorePackages', { ignorePackages: true }],
    'react/destructuring-assignment': ['error', 'never'],
    'comma-dangle': ['error', 'only-multiline'],
    'arrow-parens': ['error', 'as-needed'],
  },
};
