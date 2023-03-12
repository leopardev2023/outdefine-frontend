import React, { Dispatch, SetStateAction } from 'react';
import AssessmentAPI from 'network/assessment';
import ModalV2 from 'components/Modal/ModalV2';
import { mixpanel_track } from 'helpers/mixpanel';
import { CloseIcon, TestBoy } from '../../Icons';
import { getItem } from 'utils/storageUtils';

type Props = {
  isOpened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const MyInterviewModal = ({ isOpened, setOpened }: Props) => {
  const gotoMyInterview = async () => {
    mixpanel_track('Redirected to MyInterview.com for introduction assessment');
    await AssessmentAPI.submitIntroduction({
      email_id: getItem('email'),
      status: 'SUBMITTED',
    })
      .then(() => {
        console.log('introduction data is submitted');
      })
      .catch((err) => {
        console.log('submit introduction failed with error: ', err);
      });
  };

  return (
    <ModalV2 isOpen={isOpened}>
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className='overflow-hidden w-[680px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10'
      >
        <CloseIcon
          className='absolute right-14 top-9 z-10 cursor-pointer'
          onClick={() => setOpened(false)}
        />
        <div className='bg-white w-[680px] relative pt-[76px] pb-[60px] rounded-[8px] text-center'>
          <h1 className='max-w-[360px] mx-auto text-[20px] font-poppins font-semibold text-black'>
            You are now being redirected to Myinterview.com
          </h1>
          <img
            src={TestBoy}
            alt='hackerearth'
            width={186}
            className='mx-auto'
          />
          <p className='font-inter text-sm text-black mt-3 w-[360px] mx-auto'>
            We use Myinterview.com for our interviews. We look forward to
            getting to know you!
          </p>
          <div className='flex justify-center mt-8'>
            <a
              href='https://start.myinterview.com/jwchsts462ytm0aszwad1iy1/outdefine/outdefine-trusted-talent-interview'
              target={'_blank'}
              className='font-poppins font-semibold text-sm text-white bg-theme border border-theme rounded-lg py-[10px] px-10'
              onClick={gotoMyInterview}
            >
              Let's go!
            </a>
          </div>
        </div>
      </div>
    </ModalV2>
  );
};

export default MyInterviewModal;
