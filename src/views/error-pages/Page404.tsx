import Button from 'components/Button/ButtonV2';
import BadgeV2 from 'components/V2/Badges/BadgeV2';

export default function Page404() {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-white'>
      <BadgeV2 color='pink' addClass='h-[30px] px-[10px]'>
        Page not found
      </BadgeV2>
      <h1 className='text-[64px] font-poppins font-bold text-odf mt-2'>
        Oh No! Error 404
      </h1>
      <img src='/app/common/spaceboy/astro-app-crash.png' alt='app-crashed' />
      <p className='text-odf text-xs font-inter leading-6 max-w-[590px] text-center'>
        Oops! Something went wrong. The page you requested was not found or
        could not be reached. Please try refreshing your browser or return back
        to your homepage.
      </p>
      <a href='/dashboard'>
        <Button className='mt-10 font-poppins text-sm text-white px-3 py-2'>
          Return to homepage
        </Button>
      </a>
    </div>
  );
}
