import { render } from '@testing-library/react';
import Banner from './Banner';

describe('Banner', () => {
  it('should render title and subtitle', () => {
    const title = 'My Title';
    const subtitle = 'My Subtitle';
    const { getByText } = render(<Banner title={title} subtitle={subtitle} />);
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(subtitle)).toBeInTheDocument();
  });

  it('should render banner image when provided', () => {
    const bannerImg = 'banner.jpg';
    const { getByAltText } = render(<Banner bannerImg={bannerImg} />);
    expect(getByAltText('dashboard banner')).toHaveAttribute(
      'src',
      bannerImg
    );
  });
});
