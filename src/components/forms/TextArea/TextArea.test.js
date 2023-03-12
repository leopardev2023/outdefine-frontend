import { render, fireEvent } from "@testing-library/react"
import TextArea from "./TextArea"

describe("TextArea component", () => {
  it("should render correctly", () => {
    const { container } = render(<TextArea />)
    expect(container.querySelector("textarea")).toBeInTheDocument()
  })
})
