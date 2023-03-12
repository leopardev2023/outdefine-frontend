import { render } from '@testing-library/react';
import Assessment from './Assessment';

describe('Assessment', () => {
  it('renders the Badge component correctly', () => {
    const { getByText } = render(<Assessment type='introduction' />);
    const badge = getByText('Testing by: Outdefine');
    expect(badge).toBeInTheDocument();
  });
});
