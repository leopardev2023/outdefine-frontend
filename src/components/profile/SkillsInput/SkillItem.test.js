import { render } from "@testing-library/react"
import SkillItem from "./SkillItem"

const skill = {
  id: 1,
  name: "React",
  proficiency: 5,
  category: "Web Development",
}

test("renders skill name and proficiency", () => {
  const { container } = render(<SkillItem skill={skill} index={0} />)
  const skillName = container.querySelector(".items-center")
  expect(skillName).toHaveTextContent("React")
})
