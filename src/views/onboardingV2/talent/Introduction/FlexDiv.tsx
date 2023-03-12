import React from "react";

type IProps = {
    className?: string;
    children: JSX.Element | Array<JSX.Element>;
};

const FlexDiv = ({ className = "", children } : IProps) => {
  return <div className={"flex p-3 bg-white justify-start items-center border-solid border-2 rounded-md " + className}>
        {children}
    </div>;
};

export default FlexDiv;
