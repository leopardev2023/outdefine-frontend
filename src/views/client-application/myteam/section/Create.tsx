import * as Sentry from '@sentry/react';
import { useEffect, useState, useCallback } from 'react';
import Wrapper from '../components/Wrapper';
import { useAppDispatch, useAppSelector } from 'redux/hooks/redux-hooks';

import Welcome from 'assets/welcome/welcome.png';
import { EmailItem } from '../components/EmailItem';
import { teamMemberRoles } from '../components/RadioList';
import closeSVG from 'assets/svg/assessment/close.svg';
import { FormInput, Radio } from 'components/forms';
import starbucksSVG from 'assets/svg/application/starbucks.svg';
import Button from 'components/Button';
import { Modal } from 'components/Modal';
import leftArrowCircle from 'assets/svg/arrow-circle-left.svg';
import { ReactMultiEmail } from 'react-multi-email';
import applicationApi from 'network/application';
import { initOnLoad } from 'apexcharts';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

export interface Props {
  setNextStepPage: (enabled: number) => void;
}

const pageNumber = {
  list: 0,
  create: 1,
  edit: 2,
  newVoice: 3,
  view: 4,
};
enum pageStatus {
  MAIN,
  CREATED,
}

const Create = ({ setNextStepPage }: Props) => {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector((state) => state.companyprofile.id);
  const clientId = useAppSelector((state) => state.companyprofile.client_id);
  const [validArr, setValidArr] = useState<Array<Object>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<any>([]);
  const [isQus, setQus] = useState<boolean>(false);
  const [emails, setEmails] = useState<Array<string>>([]);
  const [roleSelected, setRoleSelected] = useState<number>(-1);
  const [role, setRole] = useState<string>('');
  const [createStatus, setCreateStatus] = useState<boolean>(false);

  const init = async () => {
    const companyList = await applicationApi.getCompanyList();
    companyList.map((com) => {
      if (com.company_id === companyId) {
        setCompanyName(com.name);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    var checkFlag = false;
    if (emails.length !== 0 && checkFlag) {
      setCreateStatus(true);
    } else {
      setCreateStatus(false);
    }
  }, [emails]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleNext = async () => {
    setModalOpen(true);
  };

  const sendInvitation = async () => {
    try {
      const result = await applicationApi.inviteTeamMembers({
        client_id: clientId,
        email_list: JSON.stringify(emails).replace('[', '').replace(']', ''),
        position: role,
      });
      toast.custom(<Toast type="success" message="Paid Successfully" />);
      setModalOpen(false);
      setNextStepPage(pageNumber.list);
    } catch (e) {
      Sentry.captureException(e);

      console.log(e);
      toast.custom(<Toast type="error" message={e} />);
    }
  };

  return (
    <Wrapper
      header_title='My team'
      ban_title='Invite members'
      ban_content='Invite new members to your team. Invite many members at once by adding their email and pressing the space bar. If the admin rights differenciate per person, send the invites seperately.'
      ban_img={Welcome}
    >
      <div className='mb-[57px]'>
        <div className='flex justify-between relative mt-10'>
          <div className='flex gap-x-14'>
            <button
              className='text-theme py-1 px-3 font-[14px] flex gap-x-2'
              onClick={() => {
                setNextStepPage(pageNumber.list);
              }}
            >
              <img
                alt='arrow-left'
                className='cursor-pointer'
                src={leftArrowCircle}
              />
            </button>
            <h1 className='font-poppins text-black font-semibold text-xl'>
              Invite members
            </h1>
          </div>
        </div>
        <div className=' mt-10 ml-[110px] flex flex-col gap-y-6'>
          <span className='text-base font-black text-[18px] font-poppins'>
            Add more team members{' '}
          </span>
          <span className='font-inter'>
            Type team members email followed by space bar to add, press send
            invite to add new team members. You can add them one at a time if
            the admin access differenciates by person. If all will have the same
            admin rights you can add all the team members you want to invite and
            send them all at once.
          </span>
        </div>
        <div className=' mt-10 ml-[110px]'>
          <div className='relative w-[566px]'>
            <ReactMultiEmail
              style={{
                marginTop: '15px',
                height: '240px',
                width: '766px',
                padding: '28px',
                border: '1px solid #D0CBAB',
                borderRadius: '15px',
                boxShadow:
                  '2px 2px 4px rgba(114, 142, 171, 0.1), -6px -6px 20px #FFFFFF, 4px 4px 20px rgba(111, 140, 176, 0.41)',
                fontFamily: 'Nunito Sans',
                fontWeight: '600',
                fontSize: '12px',
                position: 'relative',
                cursor: 'pointer',
              }}
              emails={emails}
              onChange={(_emails: string[]) => {
                setEmails(_emails);
              }}
              placeholder='Type the team members email here'
              getLabel={(
                email: string,
                index: number,
                removeEmail: (index: number) => void
              ): JSX.Element => {
                return (
                  <EmailItem onClick={() => removeEmail(index)} index={index}>
                    {email}
                  </EmailItem>
                );
              }}
            />
          </div>
        </div>
        <div className='mt-10 ml-[110px] flex flex-col items-start gap-x-10 md:gap-x-[220px] font-bold text-base w-full gap-y-5'>
          {teamMemberRoles.map((item, index) => (
            <Radio
              checked={index === roleSelected}
              label={item.name}
              name={'invitationType1' + index}
              key={'invite1-' + index}
              onClick={() => {
                setRoleSelected(index);
                setRole(item.title);
              }}
              readonly={true}
            />
          ))}
        </div>
        {
          // createStatus && (
          true && (
            <Button
              text={'Send invite'}
              onClick={handleNext}
              // disabled={!createStatus}
              disabled={false}
              className={
                'create text-white bg-theme text-base px-10 py-2 ml-[110px] font-inter my-10 w-[180px]'
              }
              fixed
            ></Button>
          )
        }
      </div>
      <Modal isOpen={modalOpen}>
        <div className='flex flex-col items-center w-[800px] bg-white rounded-[15px] shadow-3xl border border-[#2F3454] absolute top-1/4 left-[45%] -translate-x-[185px] -translate-y-[150px] z-10 px-[60px]'>
          <div className=''>
            <button
              className='absolute right-6 top-6'
              onClick={() => setModalOpen(false)}
            >
              <img src={closeSVG} alt='' />
            </button>
            <h2 className='font-poppins font-extrabold text-[20px] mt-5 text-center'>
              Invite members
            </h2>
          </div>
          <div className='invoiceItem w-full overflow-scroll my-5 font-poppins'>
            <div className='flex justify-start items-center gap-x-[25px] mt-5'>
              <img
                alt='starbucks'
                src={starbucksSVG}
                className='w-[55px] h-[55px] rounded-full shadow-3xl border bg-white border-white'
              />
              <div className='flex flex-col'>
                <span className='font-extrabold'>{companyName}</span>
                <span className='text-sm'>Team member</span>
              </div>
            </div>
            <div className='flex flex-col w-full gap-y-10 justify-between items-center gap-x-[37px] mt-5 text-sm'>
              <div className='relative w-full'>
                <ReactMultiEmail
                  style={{
                    marginTop: '15px',
                    height: '240px',
                    width: '766px',
                    paddingTop: '28px',
                    boxShadow:
                      '2px 2px 4px rgba(114, 142, 171, 0.1), -6px -6px 20px #FFFFFF, 4px 4px 20px rgba(111, 140, 176, 0.41)',

                    fontFamily: 'Nunito Sans',
                    fontWeight: '600',
                    fontSize: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  emails={emails}
                  getLabel={(
                    email: string,
                    index: number,
                    removeEmail: (index: number) => void
                  ): JSX.Element => {
                    return (
                      <EmailItem
                        onClick={() => removeEmail(index)}
                        index={index}
                        key={index}
                      >
                        {email}
                      </EmailItem>
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className='mt-10 ml-[110px] flex flex-col items-start gap-x-10 md:gap-x-[220px] font-bold text-base w-full gap-y-5'>
            {teamMemberRoles.map((item, index) => (
              <Radio
                checked={index === roleSelected}
                label={item.name}
                name={'invitationType2' + index}
                key={'invite2-' + index}
                onClick={() => {
                  setRoleSelected(index);
                  setRole(item.title);
                }}
                readonly={true}
              />
            ))}
          </div>
          <div className='flex gap-x-10 justify-center items-center'>
            <button
              className='bg-theme shadow-3xl rounded-[25px] font-inter font-bold text-[16px] text-white px-5 py-2 mt-10 mb-10 w-auto'
              onClick={sendInvitation}
            >
              Send invite
            </button>
          </div>
        </div>
      </Modal>
    </Wrapper>
  );
};

export default Create;
