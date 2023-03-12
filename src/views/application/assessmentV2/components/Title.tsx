import React from 'react';

type Props = {
  title: string;
  className?: string;
};

const Title = (props: Props) => {
  const { title, className } = props;

  return <div className={`font-poppins text-sm font-semibold ${className ?? ''}`}>{title}</div>;
};

export default Title;
