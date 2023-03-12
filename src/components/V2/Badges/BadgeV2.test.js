import { render } from "@testing-library/react"
import BadgeV2 from "./BadgeV2"

test("renders BadgeV2 with correct class names and text content", () => {
  const { getByText } = render(<BadgeV2 color="purple">Hello</BadgeV2>)
  const badgeElement = getByText("Hello")
  expect(badgeElement).toHaveClass(
    "bg-blue2-hue",
    "text-blue2",
    "rounded-lg",
    "flex",
    "items-center",
    "justify-center",
    "font-inter",
    "text-xs",
    "w-fit",
    "gap-[1px]",
    "p-2",
    "w-fit",
    "h-6"
  )
})
