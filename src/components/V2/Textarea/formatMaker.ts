const makeFormat = ({
  error,
  focus,
  disabled,
  value,
  className,
}: ITextAreaMakeFormat): string => {
  let strClassName =
    " font-inter bg-[#F0F1F2] w-full px-4 py-5 border-[1px] transition-all duration-300 rounded-lg ";

  // textarea has no validations
  if (error === undefined) {
    strClassName += " bg-[#F0F1F2]";

    strClassName += disabled
      ? " cursor-not-allowed text-light-gray"
      : ` focus:border-dark-gray focus:bg-lighter-gray hover:border-dark-gray `;

    strClassName +=
      !!value && !disabled
        ? " border-odf hover:border-odf bg-lighter-gray "
        : " border-[#F0F1F2] ";
  }

  // textarea has an error
  if (error) {
    strClassName += " !border-error ";
    strClassName += focus ? " bg-[#F9F9F9] " : " bg-error/10 ";
  }

  // textarea passed validations
  if (error === false) {
    strClassName += " !border-odf ";
    strClassName +=
      value === ""
        ? " border-[#F0F1F2] focus:border-dark-gray bg-[#F0F1F2] "
        : "";

    if (value) {
      strClassName += focus ? " bg-[#F9F9F9] " : " bg-[#D2D6ED] ";
    }
  }

  strClassName += ` ${className ?? ""} `;
  return strClassName;
};

export default makeFormat;
