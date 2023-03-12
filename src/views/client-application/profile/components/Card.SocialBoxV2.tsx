import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { useNavigate } from 'react-router-dom';

import TypographyV2 from 'components/Typography/TypographyV2';

import { ReactComponent as LinkedinSvg } from 'assets/V2/svg/linkedin.svg';
import { ReactComponent as WebsiteSvg } from 'assets/V2/svg/website.svg';
import { ReactComponent as TwitterSvg } from 'assets/V2/svg/twitter.svg';
import { ReactComponent as InstagramSvg } from 'assets/V2/svg/instagram.svg';

const SocialBoxV2: React.FC<ISocialBoxV2> = (props): ReactElement => {
  const websiteLinkData = useSelector(
    (root: RootState) => root.companyprofile.company.website
  );
  const socialLinksData = useSelector(
    (root: RootState) => root.companyprofile.company.CompanySocialLink
  );

  const websiteLink = props?.viewFromTalent
    ? props?.data?.company?.website ?? websiteLinkData
    : websiteLinkData;

  const socialLinks = props?.viewFromTalent
    ? props.data?.company.CompanySocialLink ?? socialLinksData
    : socialLinksData;

  const social_class =
    'group-hover:scale-[2.5] group-hover:rounded-lg transition-all duration-200 w-6 h-6 min-w-[24px]';

  const socials = [
    {
      id: 1,
      icon: <WebsiteSvg className={social_class} />,
      type: 'website_link',
    },
    {
      id: 2,
      icon: <LinkedinSvg className={social_class} />,
      type: 'linkedin_link',
    },
    {
      id: 3,
      icon: <TwitterSvg className={social_class} />,
      type: 'twitter_link',
    },
    {
      id: 4,
      icon: <InstagramSvg className={social_class} />,
      type: 'instagram_link',
    },
  ];

  const navigateSocial = (href: string) => {
    if (href.includes('https://') || href.includes('http://')) {
      window.open(href);
    }
    return;
  };

  return (
    <section className='mt-[85px] w-[416px] rounded-lg shadow-card py-9 px-[30px] bg-white'>
      <TypographyV2
        variant='p1'
        className='font-poppins font-semibold text-base'
      >
        Follow our socials
      </TypographyV2>
      {socials.map((social, index) => {
        const link =
          index === 0
            ? websiteLink
            : socialLinks
            ? socialLinks[social.type]
            : undefined;

        return (
          !!link && (
            <div
              onClick={() => navigateSocial(link)}
              key={social.id}
              className='cursor-pointer overflow-hidden first:mt-10 mt-4 w-full h-12 flex items-center gap-8 rounded-lg border-[1px] border-light-gray hover:border-y-blue2/50 transition-all duration-150 px-3'
            >
              {social.icon}
              <span className='text-xs'>{link}</span>
            </div>
          )
        );
      })}
    </section>
  );
};

export default SocialBoxV2;
