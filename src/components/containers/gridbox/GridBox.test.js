
import { render } from '@testing-library/react';
import GridBox from './GridBox';

test('GridBox has correct layout', () => {
  const { container } = render(
    <GridBox>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </GridBox>
  );

  const gridbox = container.firstChild;
  expect(gridbox).toHaveClass('grid');
});