import { ReactElement } from 'react';

import AssessmentCardV2 from '../componentsV2/Card.AssessmentV2';

export default function AssessmentSectionV2(): ReactElement {
  return (
    <section className='mt-8 w-full h-[320px] bg-white rounded-lg shadow-card p-[20px_0px_24px_36px]'>
      <h5 className='font-semibold text-xl leading-[150%]'>Assessments</h5>
      <div className='mt-5 flex gap-5'>
        <AssessmentCardV2 />
        <AssessmentCardV2 />
      </div>
    </section>
  );
}
