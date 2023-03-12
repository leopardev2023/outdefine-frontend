import AddButton from 'components/AddButton/AddButton';
import { render, fireEvent, screen } from '@testing-library/react';

describe("renders AddButton Component", () => {
  render(
    <AddButton
      onClick={() => {}}
      label="Add another experience (Max 3)"
      className="ml-2"
    />
  );

  it("AddButton render", () => {
    expect(screen.getByText("Add another experience (Max 3)")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Add another experience (Max 3)"));
  })
});
