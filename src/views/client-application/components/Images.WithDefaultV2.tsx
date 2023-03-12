import IconV2 from "components/V2/Icons";
import {
  default_avatars,
  default_background_colors,
  default_logos,
} from "constants/v2/default_images";
import { ReactElement } from "react";

export function LogoWithDefaultV2({ src, className }: ICompanyLogoV2): ReactElement {
  return (
    <img
      src={default_logos[src] ?? src}
      alt="company logo"
      className={`${className ?? "rounded-lg"} w-full h-full object-cover`}
    />
  );
}

export function AvatarWithDefaultV2({
  src,
  className,
  background,
}: {
  src?: string | null;
  className?: string;
  background?: string | null;
}): ReactElement {
  if (src === undefined || src === null) {
    return <IconV2 iconType="OUTDEF-LOGO" iconClassName="w-full h-full" />;
  }

  return (
    <img
      src={default_avatars[src] ?? src}
      alt="avatar"
      className={`${
        default_avatars[src]
          ? `h-full  ` + default_background_colors[background ?? 1000] ?? ""
          : "!w-full !h-full"
      } ${className ?? ""} object-cover`}
    />
  );
}
