import { ReactElement } from "react";
import { Controller } from "react-hook-form";
import { ReactComponent as CheckMark } from "./check_mark.svg";

interface IFormCheckBoxV2 extends ICheckBoxV2 {
  name: string;
  control: any;
  rules?: Record<string, any>;
}

export const FormCheckBoxV2 = ({
  name,
  control,
  rules,
  ...props
}: IFormCheckBoxV2) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <CheckBoxV2
          selected={value}
          onClick={() => onChange(!value)}
          {...props}
        >
          {props.children}
        </CheckBoxV2>
      )}
    />
  );
};

const CheckBoxV2: React.FC<ICheckBoxV2> = ({
  value,
  selected,
  onClick,
  className,
  disabled,
  children,
}): ReactElement => {
  let strClassName = `flex translate-y-1 items-center justify-center h-4 w-4 min-w-[16px] min-h-[16px] rounded-[2px] border-[1.7px] transition-all duration-150 
  ${selected ? "bg-black group-hover:bg-lighter-black" : ""} ${className || ""}`;
  strClassName += disabled
    ? "border-light-gray"
    : "border-black group-hover:border-lighter-black";

  const clickHandler = () => {
    if (!onClick || disabled) return;
    onClick(value);
  };

  return (
    <div
      className={`group flex gap-2 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={clickHandler}
    >
      <span className={strClassName}>{selected && <CheckMark />}</span>
      {children}
    </div>
  );
};

export default CheckBoxV2;
