import { render, fireEvent, getByTestId } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Button from "./Button";
import ButtonV2 from "./ButtonV2";

test("Button component", () => {
  const text = "Click me";
  const onClick = jest.fn();

  const { getByText } = render(<Button text={text} onClick={onClick} />);
  const button = getByText(text);

  expect(button).toBeInTheDocument();
  expect(button).toHaveClass(
    "text-base px-6 h-[40px] rounded-full font-inter bg-[#2F3454] text-white font-bold w-fit",
  );

  fireEvent.click(button);
  expect(onClick).toHaveBeenCalled();
});

test("Button is disabled when it's loading or disabled", () => {
  const text = "Loading";
  const onClick = jest.fn();

  render(
    <ButtonV2 onClick={onClick} loading>
      {text}
    </ButtonV2>,
  );

  render(
    <ButtonV2 onClick={onClick} disabled>
      {text}
    </ButtonV2>,
  );

  const button = screen.getByTestId("button-loading");

  expect(button).toBeInTheDocument();

  expect(button).toBeDisabled();
  fireEvent.click(button);
  expect(onClick).not.toHaveBeenCalled();

  const disabledButton = screen.getByTestId("button-disabled");

  expect(disabledButton).toBeInTheDocument();

  expect(disabledButton).toBeDisabled();
  fireEvent.click(disabledButton);
  expect(onClick).not.toHaveBeenCalled();
});
