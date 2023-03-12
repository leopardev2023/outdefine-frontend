import { render } from "@testing-library/react"
import Accordion from "./Accordion"

const data = [
  {
    name: "Engineering",
    roles: [
      {
        role_id: 1,
        role_name: "Software Engineer",
      },
      {
        role_id: 2,
        role_name: "Data Engineer",
      },
    ],
  },
  {
    name: "Product & Design",
    roles: [
      {
        role_id: 3,
        role_name: "Product Manager",
      },
      {
        role_id: 4,
        role_name: "UX Designer",
      },
    ],
  },
]

describe("Accordion", () => {
  it("renders the accordion items correctly", () => {
    const { getByText } = render(<Accordion data={data} />)
    const item1 = getByText("Engineering")
    const item2 = getByText("Product & Design")
    expect(item1).toBeInTheDocument()
    expect(item2).toBeInTheDocument()
  })
})
