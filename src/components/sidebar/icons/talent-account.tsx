const AccountIcon = (props: INavIcon) => {
  const fillColor = props.light ? '#FFFFFF' : '#2F3454';

  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 15.7V15.81C12 16.09 11.78 16.31 11.5 16.31H2.5C2.22 16.31 2 16.09 2 15.81V15.7C2 13.94 2.44 13.5 4.22 13.5H9.78C11.56 13.5 12 13.94 12 15.7Z'
        fill={fillColor}
      />
      <path
        d='M2.5 17.31C2.22 17.31 2 17.53 2 17.81V18.81V19.8C2 21.56 2.44 22 4.22 22H9.78C11.56 22 12 21.56 12 19.8V18.81V17.81C12 17.53 11.78 17.31 11.5 17.31H2.5Z'
        fill={fillColor}
      />
      <path
        d='M22 15C22 18.87 18.87 22 15 22L16.05 20.25'
        stroke={fillColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2 9C2 5.13 5.13 2 9 2L7.95 3.75'
        stroke={fillColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.5 11C20.9853 11 23 8.98528 23 6.5C23 4.01472 20.9853 2 18.5 2C16.0147 2 14 4.01472 14 6.5C14 8.98528 16.0147 11 18.5 11Z'
        fill={fillColor}
      />
    </svg>
  );
};

export default AccountIcon;
