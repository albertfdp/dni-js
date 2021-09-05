module.exports = {
  extends: "eslint:recommended",

  plugins: ["jest"],

  parserOptions: {
    ecmaVersion: 12,
  },

  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    "jest/globals": true,
  },

  rules: {},
};
