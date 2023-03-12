const formatMaker = (props: IExtendedRateRangeV2): string => {
  let className =
    "flex items-center px-4 w-full h-12 rounded-lg py-[10px] border-[1px] text-xs";

  if (
    props.min === undefined ||
    props.max === undefined ||
    props.min + props.max === 0
  ) {
    className += props.focus
      ? " text-black border-dark-gray bg-[#F0F1F2]"
      : " border-lighter-gray hover:border-dark-gray bg-[#F0F1F2] text-dark-gray";
  } else {
    className += " border-odf bg-lighter-gray";
  }
  return className;
};

export default formatMaker;

interface IExtendedRateRangeV2 extends IRateRangeV2 {
  focus: boolean;
}
