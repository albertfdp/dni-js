"use strict";

const js = require("@eslint/js");
const globals = require("globals");
const jest = require("eslint-plugin-jest");

module.exports = [
  { ignores: ["coverage/**"] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
  },
  {
    files: ["**/*.spec.js"],
    ...jest.configs["flat/recommended"],
  },
];
