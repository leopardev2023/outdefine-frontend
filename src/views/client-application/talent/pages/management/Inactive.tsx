import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks/redux-hooks';

import Button from 'components/Button/ButtonV2';
import EmptyPanelV2 from 'views/client-application/profile/panels/Panel.EmptyV2';

import TalentSkeleton from '../../components/Talent.Skeleton';
import ContractCard from '../../components/Card.Contract';

type InactiveProps = {
  loading: boolean;
};

const Inactive = ({ loading }: InactiveProps) => {
  const inactives = useAppSelector((state) => state.application.inActives);

  if (loading) return <TalentSkeleton />;

  return (
    <>
      {inactives?.length === 0 && (
        <EmptyPanelV2
          image='/common/spaceboy/astro-cook.png'
          imageClassName='w-[152px] h-[158px]'
          description='Start finding talent and create your dream team!'
          title='No talent'
          className='h-[440px] pt-[72px] mt-[126px]'
        >
          <NavLink to='/talent' className='block mt-6'>
            <Button>Find talent</Button>
          </NavLink>
        </EmptyPanelV2>
      )}
      {inactives?.length > 0 && (
        <div className='mt-[90px] flex flex-col justify-center gap-y-5 items-center bg-background'>
          {inactives?.map((item, index) => (
            <ContractCard item={item} key={index} />
          ))}
        </div>
      )}
    </>
  );
};
export default Inactive;
