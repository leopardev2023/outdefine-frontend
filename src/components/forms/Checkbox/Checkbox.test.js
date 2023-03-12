import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox component', () => {
it('should render correctly', () => {
const { container } = render(<Checkbox />);
expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
});

it('should call the onChange prop when clicked', () => {
const onChangeMock = jest.fn();
const { container } = render(<Checkbox onChange={onChangeMock} />);
const checkbox = container.querySelector('input[type="checkbox"]');
fireEvent.click(checkbox);
expect(onChangeMock).toHaveBeenCalledTimes(1);
});
});