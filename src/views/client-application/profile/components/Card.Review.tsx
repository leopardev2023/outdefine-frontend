import darkLogo from 'assets/svg/dark-logo.svg';
import developer from 'assets/profile/developer.png';

const ReviewCard = () => {
  return (
    <div className='cursor-pointer bg-white w-[250px] h-[142px] shadow-3xl rounded-[15px] py-3 px-5'>
      <div className='flex items-center gap-3'>
        <img
          src={darkLogo}
          alt='company logo'
          width={20}
          height={20}
          className='w-5 h-5'
        />
        <p className='text-sm font-semibold font-poppins'>{'Sarah Smith'}</p>
      </div>
      <p className='mt-3 text-xs'>
        {
          'Lorem ipsum dolor sit amet. Qui rerum labore eos voluptates sunt aut consequatur.'
        }
      </p>
      <div className='mt-[14px] flex items-center gap-[10px] text-xs'>
        {/* <span className='w-6 h-6 rounded-full bg-theme' /> */}
        <img src={developer} width={24} height={24} alt='template' />
        <span className='text-xs font-semibold italic'>
          {'Sarah Smith'} -{' '}
          <i className='text-[#5F5C5C]'>{'Contract designer'}</i>
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
