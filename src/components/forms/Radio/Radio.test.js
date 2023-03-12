import { render, fireEvent } from "@testing-library/react"
import Radio from "./Radio"

describe("Radio component", () => {
  it("should render correctly", () => {
    const { container } = render(<Radio />)
    expect(container.querySelector('input[type="radio"]')).toBeInTheDocument()
  })

  it("should display a checked radio button when selected", () => {
    const { container } = render(<Radio />)
    const radioButton = container.querySelector('input[type="radio"]')
    fireEvent.click(radioButton)
    expect(radioButton.checked).toBe(false)
  })

  it("should call the onChange prop when the radio button is selected", () => {
    const onChangeMock = jest.fn()
    const { container } = render(<Radio onChange={onChangeMock} />)
    const radioButton = container.querySelector('input[type="radio"]')
    fireEvent.click(radioButton)
    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })
})
