import { render } from '@testing-library/react';
import Typography from './Typography';

test('Typography component', () => {
  const text = 'Lorem ipsum dolor sit amet';

  const { container } = render(<Typography>{text}</Typography>);
  const p = container.querySelector('p');

  expect(p).toBeInTheDocument();
  expect(p).toHaveTextContent(text);
});

test('Typography component with className prop', () => {
  const text = 'Lorem ipsum dolor sit amet';
  const className = 'my-class';

  const { container } = render(<Typography className={className}>{text}</Typography>);
  const p = container.querySelector('p');

  expect(p).toBeInTheDocument();
  expect(p).toHaveClass(className);
});
