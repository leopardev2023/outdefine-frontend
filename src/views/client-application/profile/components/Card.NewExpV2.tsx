import { ReactElement } from 'react';
import useWindowDimensions from "hooks/utils/useWindowDimensions";

{
  /*
  Card components for new user's exp
  https://www.figma.com/file/3sUBW53Rt7HJxq7W04zpGU/Outdefine-Redesign?node-id=204%3A17794
*/
}

const NewExpCardV2 = (props: INewExpCardV2): ReactElement => {
  const { isMobile, isXs } = useWindowDimensions();

  return (
    <div className={`
      flex flex-col items-center w-[242px] h-[166px] bg-white rounded-lg pt-[25px] pb-[14px] shadow-card
      ${isMobile ? "basis-2/5" : ""}
      ${isXs ? "basis-full" : ""}`}>
      {props.icon}
      <p className='mt-3 font-semibold text-xs font-poppins leading-[18px] text-dark-gray'>
        {props.icon_description}
      </p>
      <h6 className='mt-1 text-xs font-semibold leading-[18px]'>
        {props.title}
      </h6>
      {props.children}
    </div>
  );
};

export default NewExpCardV2;
