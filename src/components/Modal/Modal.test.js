import { render } from "@testing-library/react"
import Modal from './Modal'
test('Modal opens and closes when toggle button is clicked', () => {
  const mockOnClose = jest.fn();
  const { queryByTestId } = render(
    <Modal isOpen={false} onClose={mockOnClose}>
      <div data-testid='modal-content'>Modal content</div>
    </Modal>
  );

  expect(queryByTestId('modal-content')).toBeNull();

});
