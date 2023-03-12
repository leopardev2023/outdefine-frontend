import { render, fireEvent } from "@testing-library/react"
import DateInput from "components/DateInput"

test("DateInput handles validation correctly", () => {
  const onChange = jest.fn()
  const onValidation = jest.fn()
  const { getByPlaceholderText } = render(
    <DateInput
      name="date"
      onChange={onChange}
      onValidation={onValidation}
      min="2020-01"
    />
  )
  const input = getByPlaceholderText("YYYY-MM")

  // Enter an invalid date
  fireEvent.change(input, { target: { value: "abcd" } })
  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onValidation).toHaveBeenCalledTimes(0)

  // Enter a valid date that is before the minimum
  fireEvent.change(input, { target: { value: "2019-12" } })
  expect(onChange).toHaveBeenCalledTimes(2)
  expect(onValidation).toHaveBeenCalledTimes(0)

  // Enter a valid date that is equal to the minimum
  fireEvent.change(input, { target: { value: "2020-01" } })
  expect(onChange).toHaveBeenCalledTimes(3)
  expect(onValidation).toHaveBeenCalledTimes(0)

  // Enter a valid date that is after the minimum
  fireEvent.change(input, { target: { value: "2020-02" } })
  expect(onChange).toHaveBeenCalledTimes(4)
  expect(onValidation).toHaveBeenCalledTimes(0)
})
