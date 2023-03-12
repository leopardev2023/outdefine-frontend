import { render } from "@testing-library/react"
import UploadVButton from "./UploadVButton"

test("renders label and upload icon", () => {
  const { container } = render(<UploadVButton label="Choose File" />)
  const label = container.querySelector("label")
  expect(label).toHaveTextContent("Choose File")
  const icon = container.querySelector("img")
  expect(icon).toBeInTheDocument()
})
