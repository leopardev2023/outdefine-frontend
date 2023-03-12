import { useAppSelector } from "redux/hooks/redux-hooks";

import { AvatarWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";
import NameRoleLocation from "./Group.NameRoleLocation";

export default function AvatarRoleNameGroup({
  user,
  role,
  boosted,
  avatarSizeClass,
  trusted,
}: {
  user: any;
  role: any;
  boosted?: boolean;
  avatarSizeClass?: string;
  trusted?: boolean;
}) {
  const roles = useAppSelector((state) => state.prototype.roles);

  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-5">
        <div className={`${avatarSizeClass ?? "w-12 h-12"}`}>
          <AvatarWithDefaultV2
            src={user?.avatar}
            background={user?.background_number}
            className="rounded-full"
          />
          {trusted && (
            <img src="/app/common/badge/trusted_badge.png" alt="trusted" className="absolute top-1/2" />
          )}
        </div>
        <NameRoleLocation
          name={user?.first_name + " " + user?.last_name}
          role={roles.find((_role) => _role.id === role)?.name ?? ""}
          boosted={boosted}
        />
      </div>
    </div>
  );
}
