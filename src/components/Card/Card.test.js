import { render } from "@testing-library/react"
import Card from "./Card"

test("Card has correct layout", () => {
  const { container } = render(<Card />)

  const card = container.firstChild
  expect(card).toHaveClass("flex flex-col w-[350px]")
})
