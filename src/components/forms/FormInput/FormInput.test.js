import FormInput from "components/forms/FormInput/FormInput";
import { render, fireEvent } from '@testing-library/react';

describe("renders FormInput Component", () => {
  let ui = render(
    <FormInput
      label="First Name"
      name="firstName"
      placeholder="First"
      className="text-[18px]"
      onChange={(e) => {}}
    />
  );

  it("Check input", () => {
    const nameInput = ui.container.querySelector('[name="firstName"]');
    fireEvent.change(nameInput, {target: {value: "Alexis Tanaka"}});
    expect(nameInput.value).toBe("");
  })
});