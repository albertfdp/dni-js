const expect = require('unexpected').clone();

const { dni, nie, isNIE, getControlDigit, isValid } = require('.');


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
      })
      
      it('returns null', () => {
        expect(dni(), 'to equal', null);
        expect(dni(2), 'to equal', null);
        expect(dni(''), 'to equal', null);
        expect(dni('1234567'), 'to equal', null);
      });
    })
  });

  describe('nie', () => {
    it('returns a NIE number with the control letter', () => {
      expect(nie('X1234567'), 'to equal', 'X1234567-L');
    });
  });

  describe('isValid', () => {
    ['12345678-Z', '12345678Z', '12345678 Z', 'X1234567-L'].forEach(number => {
      it(`returns true for valid number ${number}`, () => {
        expect(isValid(number), 'to be true');
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
        expect(isValid(number), 'to be false');
      });
    });
  });

  describe('getControlDigit', () => {
    it('when passing an integer returns Z', () => {
      expect(getControlDigit(12345678), 'to equal', 'Z');
    });

    it('when passing a string returns Z', () => {
      expect(getControlDigit('12345678'), 'to equal', 'Z');
    });

    describe('when using a NIE', () => {
      it('when passing an integer returns Z', () => {
        expect(getControlDigit('X1234567'), 'to equal', 'L');
      });
    });
  });
});
