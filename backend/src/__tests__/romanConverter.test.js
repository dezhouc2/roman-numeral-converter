/**
 * Test Document
 * 
 * I test this application with base cases,complex numbers,edge cases and error cases
 */


const { convertToRoman, isValidRomanNumber } = require('../romanConverter');

describe('Roman Numeral Converter', () => {
  describe('convertToRoman', () => {
    // base cases
    test('should convert basic numerals correctly', () => {
      expect(convertToRoman(1)).toBe('I');
      expect(convertToRoman(5)).toBe('V');
      expect(convertToRoman(10)).toBe('X');
      expect(convertToRoman(50)).toBe('L');
      expect(convertToRoman(100)).toBe('C');
      expect(convertToRoman(500)).toBe('D');
      expect(convertToRoman(1000)).toBe('M');
    });

    // subtractive notation
    test('should handle subtractive notation correctly', () => {
      expect(convertToRoman(4)).toBe('IV');
      expect(convertToRoman(9)).toBe('IX');
      expect(convertToRoman(40)).toBe('XL');
      expect(convertToRoman(90)).toBe('XC');
      expect(convertToRoman(400)).toBe('CD');
      expect(convertToRoman(900)).toBe('CM');
    });

    // complex numbers
    test('should convert complex numbers correctly', () => {
      expect(convertToRoman(27)).toBe('XXVII');
      expect(convertToRoman(48)).toBe('XLVIII');
      expect(convertToRoman(59)).toBe('LIX');
      expect(convertToRoman(93)).toBe('XCIII');
      expect(convertToRoman(141)).toBe('CXLI');
      expect(convertToRoman(163)).toBe('CLXIII');
      expect(convertToRoman(402)).toBe('CDII');
      expect(convertToRoman(575)).toBe('DLXXV');
      expect(convertToRoman(911)).toBe('CMXI');
      expect(convertToRoman(1024)).toBe('MXXIV');
      expect(convertToRoman(3000)).toBe('MMM');
    });

    // edge cases
    test('should handle edge cases correctly', () => {
      expect(convertToRoman(1)).toBe('I');
      expect(convertToRoman(3999)).toBe('MMMCMXCIX');
    });

    // error cases
    test('should throw error for invalid inputs', () => {
      expect(() => convertToRoman(0)).toThrow('Number must be between 1 and 3999');
      expect(() => convertToRoman(-1)).toThrow('Number must be between 1 and 3999');
      expect(() => convertToRoman(4000)).toThrow('Number must be between 1 and 3999');
      expect(() => convertToRoman(1.5)).toThrow('Number must be an integer');
    });
  });

  describe('isValidRomanNumber', () => {
    test('should validate numbers correctly', () => {
      expect(isValidRomanNumber(1)).toBe(true);
      expect(isValidRomanNumber(1000)).toBe(true);
      expect(isValidRomanNumber(3999)).toBe(true);
      expect(isValidRomanNumber(0)).toBe(false);
      expect(isValidRomanNumber(-1)).toBe(false);
      expect(isValidRomanNumber(4000)).toBe(false);
      expect(isValidRomanNumber(1.5)).toBe(false);
    });
  });
});