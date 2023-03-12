// import image resources
import alarm from 'assets/svg/dashboard/alarm.svg';
import setting from 'assets/svg/dashboard/setting.svg';
import message from 'assets/svg/dashboard/message.svg';

const RightHandNav = () => {
  return (
    <div className='flex items-center gap-6 border-l-2 border-l-black pl-4 2xl:pl-8 pr-[30px] 2xl:pr-[150px]'>
      <img
        src={alarm}
        alt='alarm'
        width={24}
        height={24}
        className='w-6 h-6 2xl:h-7 2xl:w-7'
      />
      <img
        src={message}
        alt='message'
        width={24}
        height={24}
        className='w-6 h-6 2xl:h-7 2xl:w-7'
      />
      <img
        src={setting}
        alt='setting'
        width={24}
        height={24}
        className='w-6 h-6 2xl:h-7 2xl:w-7'
      />
    </div>
  );
};

export default RightHandNav;
