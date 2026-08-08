declare namespace dniJs {
  /** A DNI/NIE body without its control letter, e.g. `"12345678"`, `12345678` or `"X1234567"`. */
  type Input = string | number;

  /**
   * Returns the input with its control letter appended, in the format `12345678-Z`.
   * Returns `null` if the input is not a well-formed DNI/NIE body.
   */
  function dni(number: Input): string | null;

  /** Alias for {@link dni}, named for NIE inputs (`X1234567-L`). */
  const nie: typeof dni;

  /** Returns the control letter for the given DNI/NIE body. */
  function getControlDigit(input: Input): string;

  /** Alias for {@link getControlDigit}. */
  const getLetter: typeof getControlDigit;

  /** Validates a full DNI/NIE, control letter included. */
  function isValid(dni: string): boolean;

  /**
   * Strips whitespace and upper-cases the input, returning the normalized DNI/NIE.
   * Returns `null` if the result is not valid.
   */
  function normalize(input: string): string | null;
}

export = dniJs;
