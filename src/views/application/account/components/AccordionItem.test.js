import { render } from '@testing-library/react';
import AccordionItem from './AccordionItem';

describe('AccordionItem', () => {
  it('should render title and content', () => {
    const title = 'My Title';
    const content = 'My Content';
    const { getByText } = render(<AccordionItem title={title} content={content} />);
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
  });

  it('should toggle content visibility when clicked', () => {
    const title = 'My Title';
    const content = 'My Content';
    const { getByText } = render(<AccordionItem title={title} content={content} />);
    expect(getByText(content)).toHaveClass('hidden');
    getByText(title).click();
    expect(getByText(content)).not.toHaveClass('hidden');
    getByText(title).click();
    expect(getByText(content)).toHaveClass('hidden');
  });
});
