"use strict";

const LETTERS = require("./letterMap");

const DNI_REGEXP = /^(\d{8})(\s|-)?(\w)$/;
const NIE_REGEXP = /^([XYZ]\d{7})(\s|-)?(\w)$/;

// A DNI whose leading zeros were stripped, e.g. by a spreadsheet reading it as a number.
const SHORT_DNI_REGEXP = /^(\d{1,7})-?(\w)$/;

const DNI_NUMBER_REGEXP = /^\d{8}$/;
const NIE_NUMBER_REGEXP = /^([XYZ]\d{7})$/;

const dni = (number) => {
  if (DNI_NUMBER_REGEXP.test(number) || NIE_NUMBER_REGEXP.test(number)) {
    return `${number}${getControlDigit(number)}`;
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

  const short = input.match(SHORT_DNI_REGEXP);
  if (short) {
    const [, digits, letter] = short;
    input = `${digits.padStart(8, "0")}${letter}`;
  }

  // Validate before dropping the separator: stripping it first would let
  // "12345678--Z" collapse into something valid and widen what we accept.
  return isValid(input) ? input.replace("-", "") : null;
};

module.exports = {
  dni,
  nie: dni,
  normalize,
  getControlDigit,
  getLetter: getControlDigit,
  isValid,
};
