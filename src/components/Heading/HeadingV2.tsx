import React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
  bold?: boolean;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

function Heading({ children, variant, className = '', bold = false }: Props) {
  return React.createElement(
    variant,
    {
      className: `${className} text-${variant} ${bold ? 'font-bold' : ''}`,
    },
    children
  );
}

export default Heading;
