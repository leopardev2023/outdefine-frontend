import React from "react";

import IconV2 from "components/V2/Icons/IconV2";

type IProps = {
    className?: string;
    avatar: string;
    role: string;
    name: string;
    salary: string;
    location: string;
    education: number;
};

const UserCard = ({ className = "", role, name, salary, location, education, avatar } : IProps) => (
    <div className={"h-full w-full p-3 bg-white" + className}>
        <div className="flex bg-odf h-[45%] w-full items-end justify-center">
            <img src={avatar} className="h-[98%]"/>
        </div>

        <div className="h-[55%]">
            <div className="flex items-center mt-2">
                <p className="flex font-inter text-lg font-semibold " >{role}</p>
                <div className="flex ml-auto">
                    <IconV2 iconType="EDUCATION" iconClassName="w-[24px]" />
                    <p className="flex text-dark-gray font-inter text-base ml-2">{education}+</p>
                </div>
            </div>
            <p className="font-inter text-base mt-3">{name}</p>
            <div className="flex mt-8">
                <IconV2 iconType="DOLLAR-CIRCLE" iconClassName="w-[16px] h-[16px]" />
                <p className="flex text-dark-gray font-inter text-base ml-2 font-semibold">{salary}</p>
            </div>
            <div className="flex mt-8">
                <IconV2 iconType="LOCATION" iconClassName="w-[20px] h-[20px]" />
                <p className="flex text-dark-gray font-inter text-base ml-2 font-semibold">{location}</p>
            </div>
        </div>
    </div>
);

export default UserCard;
