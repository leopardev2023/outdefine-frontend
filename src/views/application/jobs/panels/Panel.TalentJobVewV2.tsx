import Button from 'components/Button/ButtonV2';
import { NavLink } from 'react-router-dom';
import EmptyPanelV2 from 'views/client-application/profile/panels/Panel.EmptyV2';
import ContractCard from '../componentsV2/Card.ContractV2';

import useFetchedContracts from '../hooks/useFetchedContracts';

export default function TalentJobViewPanelV2({ active }: { active: boolean }) {
  const { fetching, activeContracts, inactiveContracts, refetchHandler } =
    useFetchedContracts();

  const contracts = active ? activeContracts : inactiveContracts;

  if (fetching) return <></>;

  return (
    <div className='mt-[72px]'>
      {contracts.length === 0 && (
        <EmptyPanelV2
          description='Start applying to jobs and you’ll be able to find them here!'
          title='No jobs'
          image='/app/common/spaceboy/astro-cook.png'
          className='pt-[72px] pb-[52px]'
        >
          <NavLink to='/jobs' className='mt-6'>
            <Button>Find jobs</Button>
          </NavLink>
        </EmptyPanelV2>
      )}
      <div className='flex flex-col gap-y-5'>
        {contracts.length > 0 &&
          contracts.map((contract) => (
            <ContractCard
              {...contract}
              active={active}
              onRefetch={refetchHandler}
            />
          ))}
      </div>
    </div>
  );
}
