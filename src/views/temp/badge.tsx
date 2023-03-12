import Heading from 'components/Heading/HeadingV2';
import BadgeV2 from 'components/V2/Badges/BadgeV2';
import { ReactElement } from 'react';
import { code_badge } from './codedata';
import CodePanel from './codepanel';

const BadgeComponents = (): ReactElement => {
  return (
    <>
      <Heading variant='h3'>Radio</Heading>
      <Heading className='mt-10' variant='h5'>
        Examples
      </Heading>
      <div className='mt-10 flex gap-6'>
        <BadgeV2>Tags</BadgeV2>
        <BadgeV2 color='pink'>Tags</BadgeV2>
        <BadgeV2 color='orange'>Tags</BadgeV2>
        <BadgeV2 color='purple'>Tags</BadgeV2>
      </div>
      <div className='mt-10'>
        <Heading variant='h5'>Usage</Heading>
        <p className='mt-5 mb-10'>
          <CodePanel className='py-5'>{code_badge.interface}</CodePanel>
          <CodePanel className='mt-5 py-5'>{code_badge.example}</CodePanel>
        </p>
      </div>
    </>
  );
};

export default BadgeComponents;
