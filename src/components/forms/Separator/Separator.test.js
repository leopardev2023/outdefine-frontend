import { render } from '@testing-library/react';
import Separator from './Separator';

describe('Separator component', () => {
it('should render correctly', () => {
const { container } = render(<Separator />);
expect(container.querySelector('div>span')).toBeInTheDocument();
});
});