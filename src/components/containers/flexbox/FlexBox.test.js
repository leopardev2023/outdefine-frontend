
import { render } from '@testing-library/react';
import FlexBox from './FlexBox';

test('flexbox has correct layout', () => {
  const { container } = render(
    <FlexBox>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </FlexBox>
  );

  const flexbox = container.firstChild;
  expect(flexbox).toHaveClass('flex');
});