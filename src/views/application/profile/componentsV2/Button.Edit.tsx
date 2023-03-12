import IconV2 from "components/V2/Icons/IconV2";
import * as React from "react";

const EditButton = ({ onClick }) => {
  return (
  <div onClick={onClick} className='flex items-center justify-center rounded bg-[#F4F4F4] h-[32px] w-[32px] hover:cursor-pointer'>
    <IconV2 iconType="EDIT" iconClassName="w-4" />
  </div>);
};

export default EditButton;
