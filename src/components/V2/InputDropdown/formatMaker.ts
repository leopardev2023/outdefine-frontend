const makeFormat = (
  focus: boolean,
  open: boolean,
  value: string | number,
): string => {
  let className =
    "relative flex w-full rounded-lg h-12 border-[1px] bg-[#F0F1F2] hover:bg-[#F9F9F9] transition-all duration-150";

  if (value) {
    className += " border-odf bg-lighter-gray";
    return className;
  }

  if (focus || open) {
    className += " border-dark-gray hover:border-dark-gray bg-[#F9F9F9]";
    className += open ? " z-10" : "";
  } else {
    className += " border-[#F0F1F2]";
  }

  return className;
};

export default makeFormat;
