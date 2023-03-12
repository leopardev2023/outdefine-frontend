import alarm from 'assets/svg/dashboard/alarm.svg';
import setting from 'assets/svg/dashboard/setting.svg';
import message from 'assets/svg/dashboard/message.svg';

import Banner from 'views/application/components/Banner';

interface PropsType {
  header_title: string;
  ban_title: string;
  ban_content: string;
  ban_img: string;
  children: React.ReactNode;
}

const Wrapper = ({
  header_title,
  ban_title,
  ban_content,
  ban_img,
  children,
}: PropsType) => {
  return (
    <main className='w-full h-screen overflow-x-hidden pt-[60px] pb-[75px]'>
      <div className='flex w-full justify-between pl-[165px] 2xl:pl-[315px] pr-8 2xl:pr-[150px]'>
        <h2 className='text-2xl font-bold font-poppins'>{header_title}</h2>
        <div className='flex items-center gap-6 border-l-2 border-l-black pl-4 2xl:pl-8'>
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
      </div>
      <div className='px-[165px] 2xl:px-[315px] mt-6'>
        <Banner title={ban_title} subtitle={ban_content} bannerImg={ban_img} />

        {children}
      </div>
    </main>
  );
};

export default Wrapper;
