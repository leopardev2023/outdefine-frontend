import { render } from '@testing-library/react';
import Accordion from './Accordion';

describe('Accordion', () => {
  it('should render a list of accordion items', () => {
    const list = [
      { title: 'Title 1', content: 'Content 1' },
      { title: 'Title 2', content: 'Content 2' },
    ];
    const { getByText } = render(<Accordion list={list} />);
    expect(getByText('Title 1')).toBeInTheDocument();
    expect(getByText('Title 2')).toBeInTheDocument();
  });
});
