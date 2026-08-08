const { dni, nie, getControlDigit, isValid, normalize } = require(".");

describe("dni-js", () => {
  describe("dni", () => {
    it("returns a DNI number with the control letter", () => {
      expect(dni(12345678)).toBe("12345678Z");
      expect(dni("12345678")).toBe("12345678Z");
    });

    describe("when passing an invalid number", () => {
      it("returns null if DNI contains extra chars", () => {
        expect(dni("12345678FFF")).toBeNull();
        expect(dni("X1234567FFF")).toBeNull();
      });

      it("returns null", () => {
        expect(dni()).toBeNull();
        expect(dni(2)).toBeNull();
        expect(dni("")).toBeNull();
        expect(dni("1234567")).toBeNull();
      });

      it.each(["|1234567", "W1234567", "x1234567"])(
        "returns null for invalid NIE prefix %p",
        (number) => {
          expect(dni(number)).toBeNull();
        },
      );
    });
  });

  describe("nie", () => {
    it("returns a NIE number with the control letter", () => {
      expect(nie("X1234567")).toBe("X1234567L");
    });

    describe("when passing an invalid number", () => {
      it.each(["|1234567", "W1234567", "x1234567", "X123456", ""])(
        "returns null for input %p",
        (number) => {
          expect(nie(number)).toBeNull();
        },
      );
    });
  });

  describe("isValid", () => {
    it.each(["12345678-Z", "12345678Z", "12345678 Z", "X1234567-L"])(
      "returns true for valid number %p",
      (number) => {
        expect(isValid(number)).toBe(true);
      },
    );

    it.each([
      "12345678-L",
      "12345678L",
      "12345678 L",
      "X1234567-X",
      "|1234567-L",
      "",
      null,
      undefined,
      "123456-L",
      12345678,
    ])("returns false for invalid number %p", (number) => {
      expect(isValid(number)).toBe(false);
    });
  });

  describe("getControlDigit", () => {
    it("when passing an integer returns Z", () => {
      expect(getControlDigit(12345678)).toBe("Z");
    });

    it("when passing a string returns Z", () => {
      expect(getControlDigit("12345678")).toBe("Z");
    });

    describe("when using a NIE", () => {
      it("when passing an integer returns Z", () => {
        expect(getControlDigit("X1234567")).toBe("L");
      });
    });
  });

  describe("normalize", () => {
    describe("for a valid input", () => {
      it("returns a normalized string", () => {
        expect(normalize("   12 34 56 7 8-z")).toBe("12345678Z");
      });

      it("returns a normalized NIE", () => {
        expect(normalize("x1234567l")).toBe("X1234567L");
      });
    });

    describe("for the accepted separators", () => {
      it.each(["12345678Z", "12345678-Z", "12345678 Z"])(
        "returns the same canonical string for %p",
        (input) => {
          expect(normalize(input)).toBe("12345678Z");
        },
      );

      it.each(["12345678-Z", "x1234567-l", "5821400-P", "   12 34 56 7 8-z"])(
        "is idempotent for %p",
        (input) => {
          expect(normalize(normalize(input))).toBe(normalize(input));
        },
      );
    });

    describe("when the leading zeros have been stripped", () => {
      it.each([
        ["5821400P", "05821400P"],
        ["5821400-P", "05821400P"],
        ["5 82 14 00 p", "05821400P"],
        ["24r", "00000024R"],
      ])("pads %p up to eight digits", (input, expected) => {
        expect(normalize(input)).toBe(expected);
      });
    });

    describe("for an invalid input", () => {
      it.each([
        "   12 34 56 7 8-b",
        "12345678--Z",
        "5821400X",
        "X123456L",
        null,
        undefined,
        " ",
        "",
        1,
      ])("returns null for input %p", (input) => {
        expect(normalize(input)).toBeNull();
      });
    });
  });
});
