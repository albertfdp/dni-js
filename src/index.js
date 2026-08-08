"use strict";

const LETTERS = require("./letterMap");

const DNI_REGEXP = /^(\d{8})(\s|-)?(\w)$/;
const NIE_REGEXP = /^([XYZ]\d{7})(\s|-)?(\w)$/;

// A DNI whose leading zeros were stripped, e.g. by a spreadsheet reading it as a number.
const SHORT_DNI_REGEXP = /^(\d{1,7})-?(\w)$/;

const DNI_NUMBER_REGEXP = /^\d{8}$/;
const NIE_NUMBER_REGEXP = /^([XYZ]\d{7})$/;

const withControlLetter = (body) => `${body}${getControlDigit(body)}`;

const dni = (number) =>
  DNI_NUMBER_REGEXP.test(number) ? withControlLetter(number) : null;

const nie = (number) =>
  NIE_NUMBER_REGEXP.test(number) ? withControlLetter(number) : null;

// Compatibility shim for callers upgrading from 0.2.x, where `nie` was an alias
// of `dni` and either function took either body. The two shapes are disjoint, so
// delegating can never be ambiguous.
const dniOrNie = (body) => dni(body) ?? nie(body);

const getControlDigit = (input) => {
  const digits = NIE_NUMBER_REGEXP.test(input)
    ? String(input).replace("X", 0).replace("Y", 1).replace("Z", 2)
    : input;

  return LETTERS[parseInt(digits, 10) % 23];
};

const matchesDocument = (value, matcher) => {
  if (typeof value !== "string") {
    return false;
  }

  const match = value.toUpperCase().match(matcher);
  if (!match) {
    return false;
  }

  const [, digits, , letter] = match;
  return getControlDigit(digits) === letter;
};

const isDNI = (value) => matchesDocument(value, DNI_REGEXP);
const isNIE = (value) => matchesDocument(value, NIE_REGEXP);

const isValid = (value) => isDNI(value) || isNIE(value);

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
  nie,
  dniOrNie,
  normalize,
  getControlDigit,
  getLetter: getControlDigit,
  isDNI,
  isNIE,
  isValid,
};
