import { render } from "@testing-library/react"
import Introduction from "./Introduction"
test("should render the Start button when introStatus is START", () => {
  // Arrange
  const mainData = {
    setAssessmentStep: jest.fn(),
    introStatus: "Start",
  }
  const props = { mainData, setIntroModalOpen: jest.fn() }

  // Act
  const { getByText } = render(<Introduction {...props} />)

  // Assert
  expect(getByText("Introduce Yourself")).toBeInTheDocument()
})
test("should render the Start button when introStatus is UNDER_REVIEW", () => {
  // Arrange
  const mainData = {
    setAssessmentStep: jest.fn(),
    introStatus: "Under Review",
  }
  const props = { mainData, setIntroModalOpen: jest.fn() }

  // Act
  const { getByText } = render(<Introduction {...props} />)

  // Assert
  expect(getByText("Introduce Yourself")).toBeInTheDocument()
})
