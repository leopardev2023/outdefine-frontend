import AddVButton from 'components/AddVButton/AddVButton';
import { render, fireEvent, screen } from '@testing-library/react';

describe("renders AddVButton Component", () => {
  render(
    <AddVButton
      onClick={() => {}}
      label="Add another Education"
      className="ml-2"
    />
  );

  it("AddVButton render", () => {
    expect(screen.getByText("Add another Education")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Add another Education"));
  })
});
