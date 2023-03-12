// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Logo from 'components/Logo';
import { ColorRing } from 'react-loader-spinner';

const LoadingScreen: React.FC = () => {
  return (
    <>
      <div className='absolute w-screen h-full flex items-center justify-center left-0 top-0 bg-[#f9f9f9] opacity-100 z-[200]'>
        {/* <Logo className='w-32 h-32 zoom-animation' dark /> */}
        <ColorRing
          visible={true}
          height='120'
          width='120'
          ariaLabel='blocks-loading'
          wrapperStyle={{}}
          wrapperClass=''
          colors={['#FF8134', '#FF5757', '#5F5FFF', '#2F3454', 'transparent']}
        />
      </div>
    </>
  );
};

export default LoadingScreen;
