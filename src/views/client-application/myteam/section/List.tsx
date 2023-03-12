import { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import { useAppDispatch, useAppSelector } from 'redux/hooks/redux-hooks';

import { updateTeamMemberDetail } from 'redux/slices/application';
import Welcome from 'assets/welcome/welcome.png';
import SVGCircle from '../../components/CircleSvg';
import SelectBox from '../components/SelectBox';
import rightArrowCircle from 'assets/svg/arrow-circle-right.svg';
import applicationApi from 'network/application';

const pageNumber = {
  list: 0,
  create: 1,
  edit: 2,
  newVoice: 3,
  view: 4,
};

const filters = ['My team', 'Invited members'];
const teamHeaders = ['Name', 'Position', 'Date invited', 'Invited by', 'Email'];
const invitedHeaders = [
  'Company name',
  'Date invited',
  'invited by',
  'Member Email',
];

export interface Props {
  setNextStepPage: (enabled: number) => void;
}

const List = ({ setNextStepPage }: Props) => {
  const dispatch = useAppDispatch();
  const freelancerId = useAppSelector((state) => state.profile.freelancer_id);
  const companyId = useAppSelector((state) => state.companyprofile.id);
  const clientId = useAppSelector((state) => state.companyprofile.client_id);

  const [filter, setFilter] = useState<string>('My team');
  const [teamResult, setTeamResult] = useState<any>([]);

  const init = async () => {
    const myTeamList: any = [];
    const invitedMemberList: any = [];
    console.log(companyId);
    const teamList: Array<any> = await applicationApi.getTeamMembers({
      company_id: companyId,
    });
    teamList?.filter((item) => {
      if (item.type == 'invited') {
        invitedMemberList.push(item);
      } else {
        myTeamList.push(item);
      }
    });
    // myTeamList.push(invitedHeaders);
    const teamRt = {
      'My team': myTeamList,
      'Invited members': invitedMemberList,
    };
    setTeamResult(teamRt);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper
      header_title='My team '
      ban_title='My team '
      ban_content='See who you currently have on your team. Manage or remove current team members. Also modify what they are allowed to do on the platfrom. Add new team members by inviting them.'
      ban_img={Welcome}
    >
      <div className='mt-[52px]'>
        <div className='flex justify-between relative'>
          <h1 className='font-poppins text-black font-semibold text-xl'>
            My team
          </h1>
        </div>
        <div className='mt-5 flex flex-col gap-y-2'>
          <span>
            To see current team members and their admin rights press the "
            <img
              alt='arrow-right'
              className='cursor-pointer w-5 h-5 inline'
              src={rightArrowCircle}
            />
            " following the team members name.
          </span>
          <span>To add new team members press “Invite members”.</span>
        </div>
        <div className='mt-10'>
          <button
            className='text-white py-1 px-3 font-[14px] bg-theme flex gap-x-2'
            onClick={() => {
              setNextStepPage(pageNumber.create);
            }}
          >
            <SVGCircle type='plus' mode='light' className='w-6 h-6' />
            <span>Invite memebers</span>
          </button>
        </div>
        <div className='mt-[60px] w-full shadow-3xl rounded-[15px] pl-[29px] pt-3 pb-5 pr-[43px] border border-primary'>
          <div className='flex justify-start font-semibold mb-[15px] items-center'>
            <span>Sort by: </span>
            <SelectBox
              list={filters}
              className='shadow-none w-[150px] text-base'
              placeholder=''
              selected={filter}
              onSelect={setFilter}
            />
          </div>

          <table className='w-full mx-auto font-inter font-bold '>
            <>
              <thead className='border-b-2 border-primary'>
                {filter == 'My team'
                  ? teamHeaders.map((item) => (
                      <th className='text-left'>{item}</th>
                    ))
                  : invitedHeaders.map((item) => (
                      <th className='text-left'>{item}</th>
                    ))}

                <th hidden={filter == 'Invited members'}></th>
              </thead>
              <tbody className='w-full'>
                {teamResult[filter]?.length > 0 &&
                  teamResult[filter]?.map((row: any, index: number) => (
                    <tr className=''>
                      <td className='flex justify-start items-center gap-x-5 text-base'>
                        {filter == 'My team' && (
                          <img
                            alt='starbucks'
                            src={row?.User?.avatar}
                            className='w-[40px] h-[40px] rounded-full shadow-3xl border bg-white border-white'
                          />
                        )}
                        {filter == 'My team'
                          ? row?.User.first_name + ' ' + row?.User.last_name
                          : row?.company_name}
                      </td>
                      {filter == 'My team' && (
                        <td className='text-left  text-base'>{row.position}</td>
                      )}
                      <td className='text-left  text-base'>
                        {row.date_invited
                          ? new Date(row.date_invited).toLocaleDateString(
                              'en-US',
                              {
                                year: '2-digit',
                                month: '2-digit',
                                day: '2-digit',
                              }
                            )
                          : ''}
                      </td>
                      <td className='text-left  text-base'>
                        {row?.inviter_name}
                      </td>
                      <td className='text-left  text-base'>
                        {row?.User.email_id}
                      </td>
                      <td>
                        <div className='flex justify-between items-center'>
                          <button
                            className='flex gap-x-2'
                            onClick={() => {
                              dispatch(
                                updateTeamMemberDetail({
                                  first_name: row?.User.first_name,
                                  last_name: row?.User.last_name,
                                  email: row?.User.email_id,
                                  position: row?.position,
                                  avatar: row?.User.avatar,
                                  id: row?.client_id,
                                })
                              );
                              setNextStepPage(pageNumber.view);
                            }}
                          >
                            <img
                              alt='arrow-right'
                              className='cursor-pointer'
                              src={rightArrowCircle}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};

export default List;
