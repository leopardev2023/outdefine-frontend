import * as Sentry from '@sentry/react';
import { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import { useAppDispatch, useAppSelector } from 'redux/hooks/redux-hooks';

import { updateTeamMemberDetail } from 'redux/slices/application';
import Welcome from 'assets/welcome/welcome.png';
import closeSVG from 'assets/svg/assessment/close.svg';
import { FormInput, Radio } from 'components/forms';
import { teamMemberRoles } from '../components/RadioList';
import { Modal } from 'components/Modal';
import leftArrowCircle from 'assets/svg/arrow-circle-left.svg';
import NancySVG from 'assets/svg/application/Nancy.svg';
import applicationApi from 'network/application';

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

const tableFirstHeader = [
  'SALESPERSON',
  'SHIP VIA',
  'SHIP DATE',
  'TERMS',
  'DUE DATE',
];
const tableMainHeader = [
  'Item #',
  'Description',
  'Quantity',
  'Unit Price',
  'Total',
];

enum pageStatus {
  MAIN,
  CREATED,
}

const View = ({ setNextStepPage }: Props) => {
  const dispatch = useAppDispatch();
  const freelancerId = useAppSelector((state) => state.profile.freelancer_id);
  const clientId = useAppSelector((state) => state.companyprofile.client_id);
  const teamMember = useAppSelector((state) => state.application.teamMember);
  const [validArr, setValidArr] = useState<Array<Object>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<any>([]);
  const [isQus, setQus] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalRemoveOpen, setModalRemoveOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editSatus, setEditStatus] = useState<any>(pageStatus.MAIN);
  const [roles, setRoles] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
  ]);
  const roleList = ['ADMIN', 'RECRUITER', 'HIRING MANAGER', 'BILLING'];

  const [teamInfo, setTeamInfo] = useState<any>({});

  const init = () => {
    setTeamInfo({
      id: teamMember.id,
      first_name: teamMember?.first_name,
      last_name: teamMember?.last_name,
      email: teamMember?.email,
      position: teamMember?.position,
      avatar: teamMember?.avatar,
    });
    switch (teamMember?.position) {
      case 'ADMIN':
        setRoles([true, false, false, false]);
        break;
      case 'RECRUITER':
        setRoles([false, true, false, false]);
        break;
      case 'HIRING MANAGER':
        setRoles([false, false, true, false]);
        break;
      case 'BILLING':
        setRoles([false, false, false, true]);
        break;

      default:
        setRoles([false, false, false, true]);
        break;
    }
  };

  useEffect(() => {
    init();
  }, [teamMember]);

  const onInputValidate = (e, type) => {
    if (e.target.value === '') {
    }
  };

  const updateTeamMember = async () => {
    try {
      const result = await applicationApi.updateTeamMember({
        ...teamInfo,
        client_id: clientId,
      });
      toast.custom(<Toast type="success" message="Updated Successfully" />);
      setModalOpen(false);
      setNextStepPage(pageNumber.list);
    } catch (e) {
      Sentry.captureException(e);

      console.log(e);
      toast.custom(<Toast type="error" message={JSON.stringify(e)} />);
    }
  };

  const removeTeamMember = async () => {
    try {
      const result = await applicationApi.deleteTeamMember(teamMember.id);
      toast.custom(<Toast type="success" message="Deleted Successfully" />);
      setModalRemoveOpen(false);
      setNextStepPage(pageNumber.list);
    } catch (e) {
      Sentry.captureException(e);
      toast.custom(<Toast type="error" message={JSON.stringify(e)} />);
    }
  };
  return (
    <Wrapper
      header_title='My team'
      ban_title='My team '
      ban_content='Change the admin rights to this member or remove them if needed. '
      ban_img={Welcome}
    >
      <div className='mt-[52px]'>
        <div className='flex justify-between relative items-center'>
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
              Team member
            </h1>
          </div>
        </div>
        <div className='ml-[110px] my-10'>
          <img
            alt='starbucks'
            src={teamInfo.avatar}
            className='w-[55px] h-[55px] rounded-full shadow-3xl border bg-white border-white'
          />
        </div>
        <div className='flex gap-x-10 ml-[110px] my-10 md:gap-x-[66px] font-bold text-base w-full md:w-1/2'>
          <FormInput
            label='First Name'
            name='firstName'
            placeholder='First'
            className='text-[18px]'
            onChange={(e: any) =>
              setTeamInfo({ ...teamInfo, first_name: e.target.value })
            }
            onBlur={(e) => onInputValidate(e, 'first_name')}
            value={teamInfo.first_name}
            stress
          />
          <FormInput
            label='Last Name'
            name='lastName'
            placeholder='Last'
            className='text-[18px]'
            onChange={(e: any) =>
              setTeamInfo({ ...teamInfo, last_name: e.target.value })
            }
            value={teamInfo.last_name}
            stress
          />
        </div>
        <div className='flex gap-x-10 ml-[110px] my-10 md:gap-x-[66px] font-bold text-base w-full md:w-[220px]'>
          <FormInput
            label='Position'
            name='position'
            placeholder='Recruiter'
            className='text-[18px]'
            onChange={(e: any) =>
              setTeamInfo({ ...teamInfo, position: e.target.value })
            }
            onBlur={(e) => onInputValidate(e, 'Recruiter')}
            value={teamInfo.position}
            disabled={true}
            stress
          />
        </div>
        <div className='flex gap-x-10 ml-[110px] my-10 md:gap-x-[66px] font-bold text-base w-full  md:w-[220px]'>
          <FormInput
            label='Company email'
            name='companyEmail'
            placeholder='name@company.com'
            className='text-[18px]'
            onChange={(e: any) =>
              setTeamInfo({ ...teamInfo, email: e.target.value })
            }
            onBlur={(e) => onInputValidate(e, 'name@company.com')}
            value={teamInfo.email}
            stress
          />
        </div>
        <div className='flex gap-x-10 md:gap-x-[66px] font-semibold w-full md:w-2/3'>
          <div className='mt-10 ml-[110px] flex flex-col items-start gap-x-10 md:gap-x-[220px] text-sm w-full gap-y-5'>
            {teamMemberRoles.map((item, index) => (
              <Radio
                checked={roles[index]}
                label={item.name}
                name={'invitationType' + index}
                key={index}
                onClick={() => {
                  const temp = [...roles];
                  temp[index] = !temp[index];
                  setRoles(temp);
                  setTeamInfo({ ...teamInfo, position: roleList[index] });
                }}
                readonly={true}
              />
            ))}
          </div>
        </div>

        <div className='w-full flex justify-start gap-x-20 font-inter text-sm pt-10 pb-5 ml-[110px]'>
          <button
            className='bg-theme shadow-3xl rounded-[25px] font-inter font-bold text-[16px] text-white px-5 py-2 mt-10 mb-10 w-auto'
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Update admin rights
          </button>

          <button
            className='text-theme shadow-3xl rounded-[25px] font-inter font-bold text-[16px] px-5 py-2 mt-10 mb-10 w-auto border-2 border-theme'
            onClick={() => {
              setModalRemoveOpen(true);
            }}
          >
            Remove member
          </button>
        </div>
      </div>
      <Modal isOpen={modalOpen}>
        <div className='flex flex-col items-center w-[800px] bg-white rounded-[15px] shadow-3xl border border-[#2F3454] absolute top-1/3 left-1/2 -translate-x-[185px] -translate-y-[150px] z-10 px-[140px]'>
          <div className='w-full'>
            <button
              className='absolute right-6 top-6'
              onClick={() => setModalOpen(false)}
            >
              <img src={closeSVG} alt='' />
            </button>
            <h2 className='font-poppins font-extrabold text-[20px] mt-5 text-left'>
              Confirm updated admin rights
            </h2>
          </div>
          <div className='invoiceItem w-full  my-5 font-poppins'>
            <div>
              <div className='flex justify-start items-center gap-x-[20px] mt-5'>
                <img
                  alt='starbucks'
                  src={teamMember.avatar}
                  className='w-[55px] h-[55px] rounded-full shadow-3xl border bg-white border-white'
                />
                <div className='flex flex-col'>
                  <span className='font-extrabold'>
                    {teamInfo.first_name + ' ' + teamInfo.last_name}
                  </span>
                  <span className='text-sm'>{teamInfo.position}</span>
                </div>
              </div>
              <div className='w-full  text-[16px] my-5'>
                <span className='font-extrabold font-poppins'>
                  Admins rights
                </span>
              </div>
              <div className='flex flex-col gap-y-4 mt-5'>
                {teamMemberRoles.map((item, index) => (
                  <Radio
                    checked={roles[index]}
                    label={item.name}
                    name={'invitationType' + index}
                    key={index}
                    onClick={() => {
                      const temp = [...roles];
                      temp[index] = !temp[index];
                      setRoles(temp);
                    }}
                    readonly={true}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className='flex gap-x-10 justify-center items-center'>
            <button
              className='bg-theme shadow-3xl rounded-[25px] font-inter font-bold text-[16px] text-white px-5 py-2 mt-10 mb-10 w-auto'
              onClick={updateTeamMember}
            >
              Save changes
            </button>
            <button
              className='text-theme shadow-3xl rounded-[25px] font-inter font-bold text-[16px] px-5 py-2 mt-10 mb-10 w-auto border-2 border-theme'
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={modalRemoveOpen}>
        <div className='flex flex-col items-center w-[30%] bg-white rounded-[15px] shadow-3xl border border-[#2F3454] absolute top-1/4 left-[40%] z-10 px-[140px]'>
          <div className=''>
            <button
              className='absolute right-6 top-6'
              onClick={() => setModalRemoveOpen(false)}
            >
              <img src={closeSVG} alt='' />
            </button>
            <h2 className='font-poppins font-extrabold text-[20px] mt-5 text-center'>
              Remove member
            </h2>
          </div>
          <div className='invoiceItem w-full my-5 font-poppins'>
            <div>
              <div className='flex flex-col justify-center items-center gap-x-[37px] mt-5'>
                <div className='flex justify-center items-center w-full gap-x-5'>
                  <img
                    alt='starbucks'
                    src={teamInfo.avatar}
                    className='w-[55px] h-[55px] rounded-full shadow-3xl border bg-white border-white'
                  />
                  <div className='flex flex-col'>
                    <span className='font-extrabold'>
                      {teamMember.first_name + ' ' + teamMember.last_name}
                    </span>
                    <span className='text-sm'>{teamMember.position}</span>
                  </div>
                </div>
                <div className='flex flex-col w-full text-center ml-[65px] mt-8'>
                  <span className='my-2'>Removal date</span>
                  <span className='my-3'>
                    {new Date().toLocaleDateString('en-US', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex w-full justify-center gap-x-8'>
            <button
              className='bg-theme shadow-3xl rounded-[25px] font-inter font-bold text-[14px] text-white px-4 py-1 mt-10 mb-10 w-auto'
              onClick={removeTeamMember}
            >
              Remove
            </button>
            <button
              className='text-theme shadow-3xl rounded-[25px] font-inter font-bold text-[14px] px-4 py-1 mt-10 mb-10 w-auto border-2 border-theme'
              onClick={() => {
                setModalRemoveOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </Wrapper>
  );
};

export default View;
