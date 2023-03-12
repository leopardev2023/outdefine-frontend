const makeFormat = ({
  focus,
  disabled,
  lists,
}: IListTextareFormatV2): string => {
  let strClassName =
    " w-full border-[1px] pt-10 pb-5 pl-8 pr-4 transition-all duration-300 rounded-lg focus:border-dark-gray bg-[#F0F1F2] focus:bg-[#F9F9F9] ";

  strClassName += focus
    ? " border-dark-gray "
    : !!lists && lists?.length >= 1 && lists[0].length >= 1
        ? " border-odf bg-lighter-gray "
        : " border-[#F0F1F2] hover:border-dark-gray ";

  return strClassName;
};

export default makeFormat;
