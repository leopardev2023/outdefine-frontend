import React from "react";
import { AvatarWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";

type Props = {
  avatar: string;
  bgNumber?: string | null | undefined;
  name?: string;
  status?: string;
  role?: string;
  background?: string;
  title?: string;
};

const Profile = (props: Props) => {
  const { avatar, name, status, role, bgNumber, background, title } = props;

  return (
    <div>
      <div className="flex gap-x-6">
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
          <AvatarWithDefaultV2 src={avatar} background={bgNumber} className={background ?? ""} />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-poppins font-semibold text-[20px]">Hello {name}</p>
          <span className="mt-2 font-inter text-xs font-semibold text-inactive-gray">{status}</span>
        </div>
      </div>
      {/* {role && (
        <div className="rounded-[8px] w-fit mt-7 bg-odf-light border border-theme px-5 py-3 text-sm font-inter">
          {role}
        </div>
      )} */}
      {title && (
        <div className="rounded-[8px] w-fit mt-7 bg-odf-light border border-theme px-5 py-3 text-sm font-inter">
          {title} Assessment
        </div>
      )}
    </div>
  );
};

export default Profile;
