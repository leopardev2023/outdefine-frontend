import Icon from "components/Icon";
import React from "react";

interface PropsType {
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  left?: React.ReactNode;
}

const Button: React.FC<PropsType> = ({
  type = "button",
  className = "",
  disabled = false,
  loading = false,
  onClick,
  variant = "primary",
  left,
  children,
}) => {
  const hoverOn = !loading;

  let csn = "rounded-lg font-poppins text-button px-[40px] py-[12px] disabled:cursor-not-allowed ";
  if (variant === "primary") {
    csn += `bg-odf text-lighter-gray
      ${hoverOn ? "hover:bg-odf-hue1 active:bg-odf-hue3" : ""}
      disabled:bg-odf-light disabled:text-dark-gray`;
  } else if (variant === "secondary") {
    csn += `bg-white text-odf border-[1.5px] border-odf
      ${hoverOn ? "hover:border-odf-hue1 active:border-odf-hue3 active:bg-light-gray" : ""}
      disabled:border-odf-light disabled:text-dark-gray disabled:bg-white`;
  }

  if (left) {
    csn += " flex items-center justify-center flex-row space-x-2 ";
  }

  if (loading) {
    csn += " cursor-not-allowed ";
  }

  return (
    <>
      <button
        data-cy="button"
        data-testid={loading ? "button-loading" : disabled ? "button-disabled" : "button-v2"}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`${csn} ${className}`}
      >
        {loading ? (
          <Icon name="spinner" className="mx-auto animate-spin" />
        ) : left ? (
          <>
            <span>{left}</span>
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    </>
  );
};

export default Button;
