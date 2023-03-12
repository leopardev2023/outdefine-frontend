import React from "react"
import { render, fireEvent } from "@testing-library/react"
import InputBox from "./InputBox"

describe("InputBox component", () => {
  it("should render correctly", () => {
    const { container } = render(<InputBox />)
    expect(container.querySelector("input")).toBeInTheDocument()
  })

  it("should display the correct placeholder text", () => {
    const { container } = render(<InputBox placeholder="Enter text" />)
    const input = container.querySelector("input")
    expect(input.getAttribute("placeholder")).toBe("Enter text")
  })

  it("should call the onChange prop when text is entered", () => {
    const onChangeMock = jest.fn()
    const { container } = render(<InputBox onChange={onChangeMock} />)
    const input = container.querySelector("input")
    fireEvent.change(input, { target: { value: "Test text" } })
    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })
})
