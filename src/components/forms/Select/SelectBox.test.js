import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SelectBox from './SelectBox';

test('renders select box with placeholder text', () => {
  const placeholder = 'Select an option';
  const { getByText } = render(
    <SelectBox placeholder={placeholder} list={[]} onSelect={() => {}} />
  );
  expect(getByText(placeholder)).toBeInTheDocument();
});

test('opens and closes select box when button is clicked', () => {
  const { getByText, queryByText } = render(
    <SelectBox placeholder='Select an option' list={['Option 1', 'Option 2']} onSelect={() => {}} />
  );
  fireEvent.click(getByText('Select an option'));
  expect(getByText('Option 1')).toBeInTheDocument();
  expect(getByText('Option 2')).toBeInTheDocument();

  fireEvent.click(getByText('Select an option'));
  expect(queryByText('Option 1')).toBeNull();
  expect(queryByText('Option 2')).toBeNull();
});

test('calls onSelect prop when an option is selected', () => {
  const onSelect = jest.fn();
  const { getByText } = render(
    <SelectBox placeholder='Select an option' list={['Option 1', 'Option 2']} onSelect={onSelect} />
  );
  fireEvent.click(getByText('Select an option'));
  fireEvent.click(getByText('Option 1'));
  expect(onSelect).toHaveBeenCalledWith('Option 1');
});
