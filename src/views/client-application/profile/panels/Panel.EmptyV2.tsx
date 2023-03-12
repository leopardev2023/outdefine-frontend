export default function EmptyPanelV2(props: IEmptyPanelV2) {
  return (
    <div
      className={`w-full bg-orange/75 rounded-lg px-10 flex flex-col items-center ${
        props.className ?? "h-[450px] py-12"
      }`}
    >
      <img
        src={props.image}
        alt={props.imageAltText ?? "no data to show"}
        width={185}
        height={182}
        className={props.imageClassName ?? "w-[185px] h-[182px]"}
      />
      <h6 className='mt-[18px] text-xl leading-[150%] font-semibold text-center'>
        {props.title}
      </h6>
      <p className='mt-[18px] font-inter text-sm leading-[150%] text-center'>
        {props.description}
      </p>
      {props.children}
    </div>
  );
}
