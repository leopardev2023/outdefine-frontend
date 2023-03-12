const makeFormat = ({
  error,
  focus,
  disabled,
  value,
  icon,
  className,
}: IIMakeFormat): string => {
  let strClassName =
    "w-full h-12 shadow-none border-[1px] transition-all duration-300 rounded-lg ";

  // check if it has icons on left

  strClassName += icon !== undefined ? "pl-11 pr-5" : "px-4";

  if (error === undefined) {
    strClassName += " bg-[#F0F1F2]";

    strClassName += disabled
      ? " cursor-not-allowed text-[#8A8A8A] "
      : " focus:border-dark-gray focus:bg-lighter-gray hover:border-dark-gray ";

    strClassName +=
      !!value && !disabled
        ? " border-odf bg-lighter-gray hover:border-odf "
        : " border-[#F0F1F2]";
  }

  if (error) {
    strClassName += " border-error ";
    strClassName += focus ? " bg-lighter-gray " : " bg-error/10 ";
  }

  if (error === false) {
    strClassName += " border-odf focus:border-odf ";
    strClassName +=
      value === ""
        ? " border-[#F0F1F2] focus:border-dark-gray bg-[#F0F1F2] "
        : " ";

    if (value) {
      // strClassName += focus ? ' bg-lighter-gray ' : ' bg-[#D2D6ED] ';
      strClassName += focus ? " bg-lighter-gray " : "";
    }
  }

  strClassName += ` text-xs ${className ?? ""} `;
  return strClassName;
};

export default makeFormat;
