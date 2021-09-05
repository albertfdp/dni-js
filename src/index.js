"use strict";

const LETTERS = require("./letterMap");

const DNI_REGEXP = /^(\d{8})(\s|-)?(\w)$/;
const NIE_REGEXP = /^([X|Y|Z]\d{7})(\s|-)?(\w)$/;

const DNI_NUMBER_REGEXP = /^\d{8}$/;
const NIE_NUMBER_REGEXP = /^([X|Y|Z]\d{7})$/;

const dni = (number) => {
  if (DNI_NUMBER_REGEXP.test(number) || NIE_NUMBER_REGEXP.test(number)) {
    return `${number}-${getControlDigit(number)}`;
  }

  return null;
};

const getControlDigit = (input) => {
  const digits = NIE_NUMBER_REGEXP.test(input)
    ? String(input).replace("X", 0).replace("Y", 1).replace("Z", 2)
    : input;

  return LETTERS[parseInt(digits, 10) % 23];
};

const isValid = (dni = "") => {
  const matcher = DNI_REGEXP.test(dni)
    ? DNI_REGEXP
    : NIE_REGEXP.test(dni)
    ? NIE_REGEXP
    : null;

  if (!matcher) {
    return false;
  }

  const [, digits, , letter] = dni.toUpperCase().match(matcher);
  return getControlDigit(digits) === letter;
};

const normalize = (input = "") => {
  if (!input || typeof input !== "string") return null;

  input = input.replace(/\s/g, "").toUpperCase();
  return isValid(input) ? input : null;
};

module.exports = {
  dni,
  nie: dni,
  normalize,
  getControlDigit,
  getLetter: getControlDigit,
  isValid,
};
