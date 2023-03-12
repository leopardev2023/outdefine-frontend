import React from 'react';

type Props = {
  image: string;
  title: string;
  content: JSX.Element | string;
  wrapperClass?: string;
};

const Banner = (props: Props) => {
  const { image, title, content, wrapperClass } = props;

  return (
    <>
      <div
        className={`flex gap-x-5 py-[9px] pl-[9px] pr-8 w-full flex-wrap lg:flex-nowrap min-h-[152px] bg-orange-hue-1 rounded-[8px] ${
          wrapperClass ?? ''
        }`}
      >
        <img src={image} alt='banner' className='rounded-[8px] w-auto h-[134px]' />
        <div className='px-2 mt-2'>
          <p className='font-poppins font-bold text-black text-[20px]'>{title}</p>
          <div className='font-inter text-sm mt-3'>{content}</div>
        </div>
      </div>
    </>
  );
};

export default Banner;
