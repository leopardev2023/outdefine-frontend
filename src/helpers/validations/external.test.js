import { urlValidator, urlOptionalValidator } from './external';

test('urlValidator returns correct value for valid URL', () => {
  expect(urlValidator('https://example.com')).toBe(true);
  expect(urlValidator('http://example.com')).toBe(true);
});

test('urlValidator returns correct value for invalid URL', () => {
  expect(urlValidator('example.com')).toBe(false);
});

test('urlOptionalValidator returns correct value for undefined input', () => {
  expect(urlOptionalValidator(undefined)).toBe(true);
});

test('urlOptionalValidator returns correct value for empty string input', () => {
  expect(urlOptionalValidator('')).toBe(true);
});

test('urlOptionalValidator returns correct value for valid URL', () => {
  expect(urlOptionalValidator('https://example.com')).toBe(true);
  expect(urlOptionalValidator('http://example.com')).toBe(true);
});

test('urlOptionalValidator returns correct value for invalid URL', () => {
  expect(urlOptionalValidator('example.com')).toBe(false);
});
