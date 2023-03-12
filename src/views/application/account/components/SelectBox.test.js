import { render, fireEvent } from '@testing-library/react';
import SelectBox from './SelectBox';

describe('SelectBox', () => {
  it('displays the placeholder text when no value is selected', () => {
    const placeholder = 'Select an option';
    const { getByText } = render(<SelectBox placeholder={placeholder} />);
    const button = getByText(placeholder);
    expect(button).toBeInTheDocument();
  });
});
