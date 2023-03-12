import React, { useEffect } from 'react';
import AssessmentAPI from 'network/assessment';
import Cal, { getCalApi } from '@calcom/embed-react';
import { Title } from '../components';
import { InterviewBoy } from '../Icons';
import { getItem } from 'utils/storageUtils';
import { ASSESSMENT_STEP, useAssessmentResultType } from '../hooks';
import { BackIcon } from '../Icons';
import { mixpanel_track } from 'helpers/mixpanel';

type Props = {
  mainData: useAssessmentResultType;
};

const Schedule = (props: Props) => {
  const { profile, setAssessmentStep, init } = props.mainData;

  useEffect(() => {
    (async function () {
      const Cal = await getCalApi();
      Cal &&
        Cal('on', {
          action: 'bookingSuccessful',
          callback: (e) => {
            mixpanel_track('Interview booked with outdefine-hiring team');
            setTimeout(async () => {
              await AssessmentAPI.updateInterviewScheduled(
                getItem('email')
              ).then((response) => console.log(response));
              await init();
              setAssessmentStep(ASSESSMENT_STEP.MAIN);
            }, 5000);
          },
        });
    })();
  }, [init, setAssessmentStep]);

  return (
    <div>
      <img
        src={InterviewBoy}
        alt='introduction'
        className='w-[193px] h-[224px] absolute top-20 right-40'
      />
      <Title title='Schedule your behavioral interview' className='mt-14' />
      <BackIcon
        className='mt-6 cursor-pointer'
        onClick={() => setAssessmentStep(ASSESSMENT_STEP.MAIN)}
      />
      <div className='calcom-container mt-6'></div>
      <Cal
        calLink='team/outdefine-hiring'
        config={{
          name: `${profile.first_name} ${profile.last_name}`,
          email: getItem('email'),
          notes: 'Outdefine Community Interview',
          guests: [],
          theme: 'light',
        }}
      ></Cal>
    </div>
  );
};

export default Schedule;
