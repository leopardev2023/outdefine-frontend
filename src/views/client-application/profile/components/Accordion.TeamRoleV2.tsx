import { ReactElement, useState } from 'react';

const TeamRoleAccordionV2: React.FC = (): ReactElement => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <div
      className={`mt-12 w-full py-6 px-5 rounded-lg border-[1px] border-light-gray overflow-hidden ${
        collapsed ? 'h-[356px]' : 'h-16'
      } transition-all duration-200`}
    >
      <p
        onClick={() => setCollapsed(!collapsed)}
        className={`cursor-pointer pr-3 font-semibold text-sm leading-4 font-poppins flex justify-between items-center`}
      >
        Roles
        <svg
          className={`${
            collapsed ? '' : 'rotate-180'
          } transition-all duration-150`}
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.45371 4.31999L7.31371 2.17999L6.00704 0.86666C5.45371 0.313327 4.55371 0.313327 4.00037 0.86666L0.54704 4.31999C0.0937065 4.77333 0.420373 5.54666 1.05371 5.54666H4.79371H8.94704C9.58704 5.54666 9.90704 4.77333 9.45371 4.31999Z'
            fill='#292D32'
          />
        </svg>
      </p>
      <ul className='mt-6 list-disc text-xs leading-[18px] pr-12 flex flex-col gap-[10px]'>
        <li className='ml-4'>
          <span className='font-semibold'>Admin:</span>
          <br />A “Admin” will be allowed to manage all aspects of company
          account. They are also allowed to invite other team memebers.
        </li>
        <li className='ml-4'>
          <span className='font-semibold'>Recruiter:</span>
          <br />A “Recruiter” will be allowed to post jobs and contact
          candidates. They <span className='font-semibold'>cannot</span> change
          any company information or invite other team members.
        </li>
        <li className='ml-4'>
          <span className='font-semibold'>Hiring manager:</span>
          <br />A “Hiring manager” will be allowed to post jobs, contact
          candidates, send offers and pay invoices. They
          <span className='font-semibold'> cannot</span> change any company
          information or invite other team members.
        </li>
        <li className='ml-4'>
          <span className='font-semibold'>Billing:</span>
          <br />A “Billing” team member will be allowed
          <span className='font-semibold'> ONLY</span> pay invoices or other
          billing needs in account. They
          <span className='font-semibold'> cannot</span> change any company
          information or invite other team members, create/edit any job posts or
          contact talent.
        </li>
      </ul>
    </div>
  );
};

export default TeamRoleAccordionV2;
