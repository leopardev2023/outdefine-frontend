import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Carousel from "./Carousel"

const resources = [
  <div key={1} className="carousel-item-content">
    Item 1
  </div>,
  <div key={2} className="carousel-item-content">
    Item 2
  </div>,
  <div key={3} className="carousel-item-content">
    Item 3
  </div>,
]

test("Carousel moves to the next item when the next button is clicked", () => {
  const { getByText } = render(<Carousel resources={resources} />)
  const nextButton = getByText("Next")

  fireEvent.click(nextButton)
  expect(getByText("Item 2")).toBeInTheDocument()

  fireEvent.click(nextButton)
  expect(getByText("Item 3")).toBeInTheDocument()
})

test("Carousel moves to the previous item when the prev button is clicked", () => {
  const { getByText } = render(<Carousel resources={resources} />)
  const prevButton = getByText("Prev")

  fireEvent.click(prevButton)
  expect(getByText("Item 2")).toBeInTheDocument()

  fireEvent.click(prevButton)
  expect(getByText("Item 1")).toBeInTheDocument()
})
