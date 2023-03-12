import { ReactElement } from "react";

const RadioV2 = ({ value, selected, disabled, onClick, children }: IRadioV2): ReactElement => {
  let strClassName =
    "flex items-center justify-center w-4 h-4 rounded-full border-[1.7px] transition-all duration-150 ";
  strClassName += disabled ? "border-light-gray" : "border-black group-hover:border-lighter-black";

  const clickHandler = () => {
    if (!onClick || disabled) return;
    onClick(value);
  };

  return (
    <div
      className={`group flex items-center gap-2 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={clickHandler}
    >
      <span className={strClassName}>
        {selected && (
          <span className="block w-2 h-2 bg-black group-hover:bg-lighter-black transition-all duration-150 rounded-full" />
        )}
      </span>
      {children}
    </div>
  );
};

export default RadioV2;
