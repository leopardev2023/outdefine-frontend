import { render } from '@testing-library/react';
import Footer from './Footer';

test('renders footer element', () => {
  const { container } = render(<Footer />);
  const footerElement = container.querySelector('footer');
  expect(footerElement).toBeInTheDocument();
});
