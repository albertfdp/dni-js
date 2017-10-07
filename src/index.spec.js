const unexpected = require('unexpected');

const { dni, nie, isNIE, getControlDigit, isValid } = require('.');

const expect = unexpected
  .clone()
  .addAssertion(['<any> [not] to be a valid DNI'], (expect, subject) =>
    expect(isValid(subject), '[not] to be', true)
  )
  .addAssertion(
    ['<any> [not] to have control digit <string>'],
    (expect, subject, value) => {
      return expect(getControlDigit(subject), '[not] to equal', value);
    }
  );

describe('dni-js', () => {
  describe('dni', () => {
    it('returns a DNI number with the control letter', () => {
      expect(dni(12345678), 'to equal', '12345678-Z');
      expect(dni('12345678'), 'to equal', '12345678-Z');
    });

    describe('when passing an invalid number', () => {
      it('returns null if DNI contains extra chars', () => {
        expect(dni('12345678FFF'), 'to equal', null);
        expect(dni('X1234567FFF'), 'to equal', null);
      });

      it('returns null', () => {
        expect(dni(), 'to equal', null);
        expect(dni(2), 'to equal', null);
        expect(dni(''), 'to equal', null);
        expect(dni('1234567'), 'to equal', null);
      });
    });
  });

  describe('nie', () => {
    it('returns a NIE number with the control letter', () => {
      expect(nie('X1234567'), 'to equal', 'X1234567-L');
    });
  });

  describe('isValid', () => {
    ['12345678-Z', '12345678Z', '12345678 Z', 'X1234567-L'].forEach(number => {
      it(`returns true for valid number ${number}`, () => {
        expect(number, 'to be a valid DNI');
      });
    });

    [
      '12345678-L',
      '12345678L',
      '12345678 L',
      'X1234567-X',
      '',
      null,
      undefined,
      '123456-L',
      12345678
    ].forEach(number => {
      it(`returns false for invalid number ${number}`, () => {
        expect(number, 'not to be a valid DNI');
      });
    });
  });

  describe('getControlDigit', () => {
    it('when passing an integer returns Z', () => {
      expect(12345678, 'to have control digit', 'Z');
    });

    it('when passing a string returns Z', () => {
      expect('12345678', 'to have control digit', 'Z');
    });

    describe('when using a NIE', () => {
      it('when passing an integer returns Z', () => {
        expect('X1234567', 'to have control digit', 'L');
      });
    });
  });
});
