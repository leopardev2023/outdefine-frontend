
import { render } from '@testing-library/react';
import Container from './Container';

test('Container has correct layout', () => {
  const { container } = render(
    <Container>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Container>
  );

  const container_ui = container.firstChild;
  expect(container_ui).toHaveClass('px-[2%] lg:px-[5%]');
});