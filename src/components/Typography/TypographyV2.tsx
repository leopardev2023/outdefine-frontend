import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  semibold?: boolean;
  variant: "subtitle1" | "subtitle2" | "p1" | "p2" | "p3" | "caption" | "label";
}

function TypographyV2({ children, variant, className = "", semibold = false }: Props) {
  const csn = `text-${variant} ${className} ${semibold ? 'font-semibold' : ''} `;

  if (variant === 'subtitle1' || variant === 'subtitle2') {
    return <section className={csn}>{children}</section>
  }

  if (variant === 'caption' || variant === 'label') {
    return <span className={csn}>{children}</span>
  }

  return <p className={csn}>{children}</p>
}

export default TypographyV2;
