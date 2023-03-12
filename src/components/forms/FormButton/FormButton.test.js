import { render, fireEvent } from "@testing-library/react"
import FormButton from "./FormButton"

describe("FormButton component", () => {
  it("should render correctly", () => {
    const { container } = render(<FormButton />)
    expect(container.querySelector("button")).toBeInTheDocument()
  })

  it("should display the correct text", () => {
    const { container } = render(<FormButton text="Submit" />)
    const button = container.querySelector("button")
    expect(button.textContent).toBe("Submit")
  })

  it("should call the onClick prop when clicked", () => {
    const onClickMock = jest.fn()
    const { container } = render(<FormButton onClick={onClickMock} />)
    const button = container.querySelector("button")
    fireEvent.click(button)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
