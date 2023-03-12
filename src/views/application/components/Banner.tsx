import React from 'react';

interface PropsType {
  title?: any;
  subtitle?: any;
  bannerImg?: string;
  step?: number;
  space?: boolean;
}

const Banner: React.FC<PropsType> = ({
  title = '',
  subtitle = '',
  bannerImg = undefined,
  space = false,
  step = -1,
}) => {
  return (
    <div className='h-[140px] bg-theme rounded-[15px] flex justify-between pl-9 pr-10'>
      <div>
        <h3 className='pt-5 text-white text-xl font-semibold font-poppins'>
          {title}
        </h3>
        <p
          className={`text-white pt-4 text-base font-medium ${
            bannerImg || space ? 'pr-12' : ''
          }`}
        >
          {subtitle}
        </p>
      </div>
      {bannerImg && (
        <img src={bannerImg} alt='dashboard banner' draggable={false} />
      )}
    </div>
  );
};

export default Banner;
