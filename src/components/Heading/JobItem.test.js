import Heading from "components/Heading";
import { render, screen } from "@testing-library/react";

describe("Heading", () => {
  let ui = render(
    <Heading size={3} className="font-medium font-poppins text-[20px]">
      Hello
    </Heading>
  );

  it("Check Heading text", () => {
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
