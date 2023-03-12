import { render } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';

describe('LoadingScreen component', () => {
it('should render correctly', () => {
const { container } = render(<LoadingScreen />);
expect(container.querySelector('.absolute')).toBeInTheDocument();
});

it('should display the loading spinner', () => {
const { container } = render(<LoadingScreen />);
expect(container.querySelector('svg')).toBeInTheDocument();
});
});




