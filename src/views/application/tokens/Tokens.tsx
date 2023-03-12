import IconV2 from 'components/V2/Icons/IconV2';
import TabV2WithNavigation from 'components/V2/Tab/TabV2WithNavigation';
import { useState } from 'react';
import { useAppSelector } from 'redux/hooks/redux-hooks';
import { Profile } from './components/Profile';
import { FAQnGrowth } from './FAQnGrowth';
import { TokenOverview } from './Overview';
import { Referals } from './Referals';

const TabIcons = {
  0: (
    <div className='flex flex-col gap-y-5 justify-center items-center'>
      <img
        src='/app/common/spaceboy/mooner.png'
        alt='astronaut-victory'
        className='h-[148px]'
      />
      <IconV2 iconType='SHADOW' />
    </div>
  ),
  1: <img src='/app/tokens/astronaut-faqs.png' alt='faqs' className='h-[148px]' />,
  2: (
    <img
      src='/app/common/spaceboy/astro-roller.png'
      alt='astronaut-victory'
      className='h-[148px]'
    />
  ),
};

function Tokens() {
  const profile = useAppSelector((state) => state.profile);
  const [activeTab, setActiveTab] = useState(0);
  return (
    <main className='w-full h-full overflow-x-hidden overflow-y-scroll flex'>
      <div className='w-full p-20'>
        <Profile
          name={`${profile.first_name} ${profile.last_name}`}
          jobTitle={profile.Role?.name}
          sideIcon={TabIcons[activeTab]}
          avatar={profile.User?.avatar || undefined}
          background={profile.User.background_number}
        />
        <TabV2WithNavigation
          tabClass='w-32 xl:w-[175px] h-11 font-poppins font-semibold text-xs'
          tabs={['Token Overview', 'FAQs & Growth', 'Referrals']}
          contents={[
            <TokenOverview tabHandler={setActiveTab} />,
            <FAQnGrowth />,
            <Referals />,
          ]}
          onTabChange={setActiveTab}
          activeTab={activeTab}
        />
      </div>
    </main>
  );
}

export default Tokens;
