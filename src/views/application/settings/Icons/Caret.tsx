const CaretIcon = (props) => {
  return (
    <svg 
      width='24px' 
      height='24px' 
      viewBox='0 0 24 24' 
      fill='none' 
      xmlns='http://www.w3.org/2000/svg'
      className={`${props.open ? 'rotate-180' : ''} font-bold transition-all duration-200`}
    >
      <path 
        d='M6.1018 8C5.02785 8 4.45387 9.2649 5.16108 10.0731L10.6829 16.3838C11.3801 17.1806 12.6197 17.1806 13.3169 16.3838L18.8388 10.0731C19.5459 9.2649 18.972 8 17.898 8H6.1018Z'
        fill='#161719'
      />
    </svg>
  );
};

export default CaretIcon;