import { stringNotEmptyOrUndefined } from "./form"

test("stringNotEmptyOrUndefined returns correct value for empty string", () => {
  expect(stringNotEmptyOrUndefined("")).toBe(false)
})

test("stringNotEmptyOrUndefined returns correct value for undefined input", () => {
  expect(stringNotEmptyOrUndefined(undefined)).toBe(false)
})

test("stringNotEmptyOrUndefined returns correct value for non-empty string", () => {
  expect(stringNotEmptyOrUndefined("abc")).toBe(true)
})
