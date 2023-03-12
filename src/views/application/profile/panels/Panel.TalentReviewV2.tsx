import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import Button from 'components/Button/ButtonV2';
import Heading from 'components/Heading/HeadingV2';

import ReviewCardV2 from 'views/client-application/profile/components/Card.ReviewV2';
import EmptyPanelV2 from 'views/client-application/profile/panels/Panel.EmptyV2';

interface PropsType {
  userRole?: string;
}

export default function TalentReviewPanelV2({
  userRole,
}: PropsType): ReactElement {
  return (
    <EmptyPanelV2
      className={`h-[480px] mt-[54px] mb-20 pt-[54px] pb-20 flex flex-col ${
        userRole === 'Client' ? 'justify-center' : ''
      }`}
      image={'/app/common/spaceboy/astro-meaningless.png'}
      title={'No reviews'}
      description={
        userRole === 'Client'
          ? 'There are no reviews to show for this candidate.'
          : 'Get reviews from companies you have worked with!'
      }
    >
      {userRole !== 'Client' && (
        <NavLink to='/jobs'>
          <Button className='mt-5'>Find jobs</Button>
        </NavLink>
      )}
    </EmptyPanelV2>
  );
  return (
    <div className='mt-[54px] mb-20 w-full py-8 px-9 bg-white rounded-lg shadow-card relative'>
      <Heading variant='h6' className='text-xl leading-[150%] font-semibold'>
        Reviews
      </Heading>
      <div className='mt-8 flex flex-wrap gap-6'>
        <ReviewCardV2
          name={'Jane Doe'}
          rating={2}
          companyName={'Outdefine'}
          position={'Hiring manager'}
          description='Lorem ipsum dolor sit amet. Est sunt obcaecati aut consectetur distinctio eum. Cumque nesciunt qui iste nesciunt eos sint similique ea vero necessitatibus.'
        />
        <ReviewCardV2
          name={'Jane Doe'}
          rating={2}
          companyName={'Outdefine'}
          position={'Hiring manager'}
          description='Lorem ipsum dolor sit amet. Est sunt obcaecati aut consectetur distinctio eum. Cumque nesciunt qui iste nesciunt eos sint similique ea vero necessitatibus.'
        />
        <ReviewCardV2
          name={'Jane Doe'}
          rating={2}
          companyName={'Outdefine'}
          position={'Hiring manager'}
          description='Lorem ipsum dolor sit amet. Est sunt obcaecati aut consectetur distinctio eum. Cumque nesciunt qui iste nesciunt eos sint similique ea vero necessitatibus.'
        />
      </div>
    </div>
  );
}
