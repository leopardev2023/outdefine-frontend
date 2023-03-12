import { ReactElement, ReactNode } from "react";

export default function OverViewCard({
  icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: ReactNode;
}): ReactElement {
  return (
    <div className='flex items-center flex-col w-[100px] md:w-[130px] h-[120px] md:h-[130px]
    bg-white rounded-lg pt-3 md:pt-8 px-3 md:px-0 shadow-card'>
      {icon}
      <span className='block mt-1 text-center font-poppins font-semibold text-xs text-darker-gray'>
        {title}
      </span>
      <span className='flex items-center text-center gap-[5px] mt-[10px] font-poppins font-semibold text-xs capitalize'>
        {value}
      </span>
    </div>
  );
}

export function OverViewCardForOffer({
  icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: ReactNode;
}): ReactElement {
  return (
    <div className='flex items-center flex-col w-[130px] h-[130px] bg-white rounded-lg pt-6 shadow-card'>
      {icon}
      <span className='block mt-1 font-poppins font-semibold text-xs text-darker-gray'>
        {title}
      </span>
      <span className='flex items-center text-center gap-[5px] mt-[10px] font-poppins font-semibold text-xs'>
        {value}
      </span>
    </div>
  );
}
