// https://eslint.org/docs/user-guide/configuring
const IS_DEV = (process.env.NODE_ENV !== 'production')

module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },

  env: {
    browser: true,
    node: true
  },

  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',

    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],

  // required to lint *.vue files
  plugins: [
    'vue'
  ],

  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',

    // disable trailing spaces
    'no-trailing-spaces': 'off',

    // enable spacing between string tpl ${}
    'template-curly-spacing': ['error', 'always'],

    // brace style as Stroustrup style
    'brace-style': ["error", "stroustrup"],

    // allow console.log during development only
    'no-console': (IS_DEV) ? 'off' : 'error',

    // allow debugger during development only
    'no-debugger': (IS_DEV) ? 'off' : 'error'
  }
}
