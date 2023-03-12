import RightHandNav from 'views/application/components/RightHandNavigation';

const PageHeading = ({ children }: any) => {
  return (
    <div className='flex justify-between pb-8 pl-[165px] 2xl:pl-[315px]'>
      <h2 className='font-poppins font-bold text-xl'>{children}</h2>
      <RightHandNav />
    </div>

  );
};

export default PageHeading;
