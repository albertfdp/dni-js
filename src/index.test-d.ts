// Compile-only assertions for src/index.d.ts. Never executed: `tsc --noEmit` via
// `pnpm run types:check` is the whole point, and the name is deliberately outside
// Jest's default testMatch so `pnpm test` ignores it. The type annotations below
// are the assertions -- each one fails to compile if the declaration drifts.
import dni = require("./index");

// Namespace access, as documented in the README.
const withLetter: string | null = dni.dni("12345678");
const fromNumber: string | null = dni.dni(12345678);
const nieWithLetter: string | null = dni.nie("X1234567");
const letter: string = dni.getControlDigit("12345678");
const aliasedLetter: string = dni.getLetter(12345678);

// Destructuring, as used by src/index.spec.js and most consumers.
const { isValid, normalize } = dni;

const valid: boolean = isValid("12345678-Z");
const normalized: string | null = normalize("   12 34 56 7 8-z");

// The Input type is reachable for consumers annotating their own helpers.
const body: dni.Input = "12345678";

// The runtime tolerates these defensively, but they are not part of the API.
// @ts-expect-error isValid takes a full DNI/NIE string
isValid(12345678);
// @ts-expect-error normalize takes a string
normalize(null);
// @ts-expect-error dni requires an argument
dni.dni();

void [
  withLetter,
  fromNumber,
  nieWithLetter,
  letter,
  aliasedLetter,
  valid,
  normalized,
  body,
];
