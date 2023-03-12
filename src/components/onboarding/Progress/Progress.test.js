import { render } from '@testing-library/react';
import Progress from './Progress';

describe('Progress component', () => {
it('should render correctly', () => {
const { container } = render(<Progress />);
expect(container.querySelector('.flex')).toBeInTheDocument();
});

});




