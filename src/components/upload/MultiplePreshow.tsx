interface PropsType {
  urls: Array<string>;
}

const MultiplePreshow = ({ urls }: PropsType) => {
  return (
    <div>
      <div className='w-full px-1 flex justify-between items-center'>
        <LeftArrowCircle />
        <div className='flex items-center max-w-[360px] translate-x-[30px]'>
          <img
            src={urls[urls.length - 1]}
            alt='left'
            width={130}
            height={120}
            draggable={false}
            className='shadow-xl rounded-[15px] h-[120px] block'
          />
          <img
            src={urls[0]}
            alt='center'
            width={158}
            height={148}
            draggable={false}
            className={`shadow-xl rounded-[15px] h-[148px] block z-10 -translate-x-[60px]`}
          />
          <img
            src={urls.length === 2 ? urls[1] : urls[urls.length - 2]}
            width={130}
            height={120}
            draggable={false}
            className='shadow-xl rounded-[15px] h-[120px] block -translate-x-[120px]'
          />
        </div>
        <RightArrowCircle />
      </div>
      <label
        htmlFor='upload_input'
        className='cursor-pointer block w-full text-center text-white text-base font-semibold mt-[14px] underline underline-offset-4'
      >
        Change Image
      </label>
    </div>
  );
};

export const LeftArrowCircle = () => {
  return (
    <span className='cursor-pointer w-5 h-5 bg-white flex justify-center items-center rounded-full'>
      <span className='w-2 h-2 border-b-2 border-l-2 border-theme rotate-45 translate-x-[2px]' />
    </span>
  );
};

export const RightArrowCircle = () => {
  return (
    <span className='cursor-pointer w-5 h-5 bg-white flex justify-center items-center rounded-full'>
      <span className='w-2 h-2 border-t-2 border-r-2 border-theme rotate-45 -translate-x-[1px]' />
    </span>
  );
};

export default MultiplePreshow;
