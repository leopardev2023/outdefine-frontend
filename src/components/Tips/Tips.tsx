import React from "react";

interface Props {
    IconSrc: string;
    Text: string;
  }

const Tips: React.FC<Props> = ({ IconSrc, Text }) => {
  return (
        <div>
            <img src={IconSrc} width="24px" className="peer" />
            <div className="hidden peer-hover:block mt-[5px] absolute \
             border-x-transparent border-b-[7px] border-x-[12px] border-b-odf z-20"/>
            <span className={`bg-odf text-[14px] font-inter text-white \
             py-[8px] px-[16px] w-[300px] md:w-[500px] absolute z-20 rounded \
              hidden peer-hover:block ml-[-125px] md:ml-[-212px] mt-[10px]` }>
                {Text}
            </span>
        </div>);
};
export default Tips;
