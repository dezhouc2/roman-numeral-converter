/**
 * Roman Numeral Converter Algorithm
 * 
 * Based on the standard Roman numeral system as described in: https://en.wikipedia.org/wiki/Roman_numerals
 * 
 * Key rules:
 * - I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000
 * - Subtraction notation: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900
 * - Valid range: 1 to 3999
 */

/**
 * Roman numeral mappings in descending order of value;Includes subtractive notation cases (IV, IX, XL, XC, CD, CM)
 */


const ROMAN_MAPPINGS = [
  { value: 1000, symbol: 'M' },
  { value: 900, symbol: 'CM' },
  { value: 500, symbol: 'D' },
  { value: 400, symbol: 'CD' },
  { value: 100, symbol: 'C' },
  { value: 90, symbol: 'XC' },
  { value: 50, symbol: 'L' },
  { value: 40, symbol: 'XL' },
  { value: 10, symbol: 'X' },
  { value: 9, symbol: 'IX' },
  { value: 5, symbol: 'V' },
  { value: 4, symbol: 'IV' },
  { value: 1, symbol: 'I' }
];

/**
 * Converts a positive integer to its Roman numeral representation
 * 
 * @param {number} num - Integer between 1 and 3999
 * @returns {string} Roman numeral string
 * @throws {Error} if number is out of valid range
 */

function convertToRoman(num) {
  // Validate input range
  if (num < 1 || num > 3999) {
    throw new Error('Number must be between 1 and 3999');
  }

  if (!Number.isInteger(num)) {
    throw new Error('Number must be an integer');
  }

  let result = '';
  let remaining = num;

  // Process each Roman numeral mapping in descending order
  for (const mapping of ROMAN_MAPPINGS) {
    
    while (remaining >= mapping.value) {
      result += mapping.symbol;
      remaining -= mapping.value;
    }
  }

  return result;
}

/**
 * Validates if a number can be converted to Roman numerals
 * 
 * @param {number} num - Number to validate
 * @returns {boolean} true if valid, false otherwise
 */

function isValidRomanNumber(num) {
  return Number.isInteger(num) && num >= 1 && num <= 3999;
}

module.exports = {
  convertToRoman,
  isValidRomanNumber
};