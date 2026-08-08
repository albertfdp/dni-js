declare namespace dniJs {
  /** A DNI/NIE body without its control letter, e.g. `"12345678"`, `12345678` or `"X1234567"`. */
  type Input = string | number;

  /**
   * Returns the input with its control letter appended, in the official format
   * `12345678Z` (no separator).
   * Returns `null` if the input is not a well-formed DNI/NIE body.
   */
  function dni(number: Input): string | null;

  /** Alias for {@link dni}, named for NIE inputs (`X1234567L`). */
  const nie: typeof dni;

  /** Returns the control letter for the given DNI/NIE body. */
  function getControlDigit(input: Input): string;

  /** Alias for {@link getControlDigit}. */
  const getLetter: typeof getControlDigit;

  /**
   * Validates a full DNI/NIE, control letter included. Permissive about the
   * separator: `12345678Z`, `12345678-Z` and `12345678 Z` all validate.
   */
  function isValid(dni: string): boolean;

  /**
   * Returns the canonical DNI/NIE for the input: whitespace and separator
   * removed, upper-cased, leading zeros restored — so every spelling of the
   * same identity maps to the identical string, safe to use as a storage or
   * dedup key. Returns `null` if the result is not valid.
   */
  function normalize(input: string): string | null;
}

export = dniJs;
