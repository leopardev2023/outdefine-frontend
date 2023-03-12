import validateEmail from './email';

test('validateEmail returns correct value for valid email', () => {
  expect(validateEmail('user@example.com')).toBe(true);
});

test('validateEmail returns correct value for invalid email', () => {
  expect(validateEmail('invalid')).toBe(false);
});
