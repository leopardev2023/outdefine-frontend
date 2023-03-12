import { render } from '@testing-library/react';
import Wrapper from './Wrapper';

describe('Wrapper', () => {
  it('displays the header title', () => {
    const headerTitle = 'Dashboard';
    const { getByText } = render(<Wrapper header_title={headerTitle} />);
    const header = getByText(headerTitle);
    expect(header).toBeInTheDocument();
  });
});
