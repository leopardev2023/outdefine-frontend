import formatMaker from "./formatMaker"

test("returns class name based on focus and disabled props", () => {
  const focus = true
  const disabled = false
  const lists = [
    ["item 1", "item 2", "item 3"],
    ["item 4", "item 5", "item 6"],
  ]
  const expected =
    " w-full border-[1px] pt-10 pb-5 pl-8 pr-4 transition-all duration-300 rounded-lg focus:border-dark-gray bg-[#F0F1F2] focus:bg-[#F9F9F9]  border-dark-gray "
  const result = formatMaker({ focus, disabled, lists })
  expect(result).toEqual(expected)
})

test("returns class name based on lists prop", () => {
  const focus = false
  const disabled = false
  const lists = [
    ["item 1", "item 2", "item 3"],
    ["item 4", "item 5", "item 6"],
  ]
  const expected =
    " w-full border-[1px] pt-10 pb-5 pl-8 pr-4 transition-all duration-300 rounded-lg focus:border-dark-gray bg-[#F0F1F2] focus:bg-[#F9F9F9]  border-odf bg-lighter-gray "
  const result = formatMaker({ focus, disabled, lists })
  expect(result).toEqual(expected)
})
