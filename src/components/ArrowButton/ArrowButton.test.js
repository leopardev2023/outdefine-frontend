import ArrowButton from 'components/ArrowButton';
import { render, fireEvent } from "@testing-library/react"

describe("ArrowButton component", () => {
  it("should render correctly", () => {
    const { container } = render(
      <ArrowButton direction="NEXT" onClick={() => {}} />
    )
    expect(container.querySelector("img")).toBeInTheDocument()
  })

  it("should call the onClick prop when clicked", () => {
    const onClickMock = jest.fn()
    const { container } = render(
      <ArrowButton direction="NEXT" onClick={onClickMock} />
    )
    const arrowButton = container.querySelector("img")
    fireEvent.click(arrowButton)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
