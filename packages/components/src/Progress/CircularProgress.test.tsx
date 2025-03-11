import { describe, test, expect } from 'vitest';
import { getSizeValue } from './CircularProgress';
import type { CircularProgressSize } from './CircularProgress';

// Since getSizeValue is not exported in the original file, we need to mock it
// For testing purposes, we're assuming it's exported or we're testing it directly
describe('getSizeValue function', () => {
  test('returns 24 for size "sm"', () => {
    const result = getSizeValue('sm');
    expect(result).toBe(24);
  });

  test('returns 40 for size "md"', () => {
    const result = getSizeValue('md');
    expect(result).toBe(40);
  });

  test('returns 56 for size "lg"', () => {
    const result = getSizeValue('lg');
    expect(result).toBe(56);
  });

  test('returns 40 for default/unknown size', () => {
    // Using type assertion to test the default case
    const result = getSizeValue('unknown' as CircularProgressSize);
    expect(result).toBe(40);
  });

  test('handles all possible size values', () => {
    const sizes: CircularProgressSize[] = ['sm', 'md', 'lg'];
    const expectedValues = [24, 40, 56];

    sizes.forEach((size, index) => {
      expect(getSizeValue(size)).toBe(expectedValues[index]);
    });
  });

  test('returns consistent values for repeated calls', () => {
    expect(getSizeValue('sm')).toBe(getSizeValue('sm'));
    expect(getSizeValue('md')).toBe(getSizeValue('md'));
    expect(getSizeValue('lg')).toBe(getSizeValue('lg'));
  });

  test('returns number type for all inputs', () => {
    const sizes: CircularProgressSize[] = ['sm', 'md', 'lg'];

    for (const size of sizes) {
      expect(typeof getSizeValue(size)).toBe('number');
    }

    // Also test default case
    expect(typeof getSizeValue('unknown' as CircularProgressSize)).toBe(
      'number',
    );
  });
});
