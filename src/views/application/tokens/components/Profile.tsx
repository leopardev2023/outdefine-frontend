import SampleAvatar from 'assets/assessment/avatar/sample.png';
import { AvatarWithDefaultV2 } from 'views/client-application/components/Images.WithDefaultV2';

type ProfileProps = {
  name: string;
  jobTitle: string;
  avatar?: string;
  sideIcon: JSX.Element;
  background?: string | null;
  className?: string;
};

export function Profile(props: ProfileProps) {
  const { avatar, name, jobTitle, background, className } = props;
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex gap-x-6">
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
          <AvatarWithDefaultV2
            src={avatar}
            background={background}
            className={className}
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-poppins font-semibold text-[20px]">{name}</p>
          <span className="mt-2 font-inter text-xs font-semibold text-inactive-gray">
            {jobTitle}
          </span>
        </div>
      </div>
      {props.sideIcon}
    </div>
  );
}
