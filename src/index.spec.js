const { dni, nie, getControlDigit, isValid, normalize } = require(".");

describe("dni-js", () => {
  describe("dni", () => {
    it("returns a DNI number with the control letter", () => {
      expect(dni(12345678)).toBe("12345678-Z");
      expect(dni("12345678")).toBe("12345678-Z");
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
    });
  });

  describe("nie", () => {
    it("returns a NIE number with the control letter", () => {
      expect(nie("X1234567")).toBe("X1234567-L");
    });
  });

  describe("isValid", () => {
    it.each(["12345678-Z", "12345678Z", "12345678 Z", "X1234567-L"])(
      "returns true for valid number %p",
      (number) => {
        expect(isValid(number)).toBe(true);
      }
    );

    it.each([
      "12345678-L",
      "12345678L",
      "12345678 L",
      "X1234567-X",
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
        expect(normalize("   12 34 56 7 8-z")).toBe("12345678-Z");
      });
    });

    describe("for an invalid input", () => {
      it.each(["   12 34 56 7 8-b", null, undefined, " ", "", 1])(
        "returns null for input %p",
        (input) => {
          expect(normalize(input)).toBeNull();
        }
      );
    });
  });
});
