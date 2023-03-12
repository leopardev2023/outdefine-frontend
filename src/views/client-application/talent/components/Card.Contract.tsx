import { useAppSelector } from "redux/hooks/redux-hooks";
import Button from "components/Button/ButtonV2";
import BadgeV2 from "components/V2/Badges/BadgeV2";
import { LogoWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";
import formatDate from "helpers/date";
import AvatarRoleNameGroup from "./Group.AvatarRoleName";

interface PropsType {
  setCreateModal?: (enabled: boolean) => void;
  setUpdateModal?: (enabled: boolean) => void;
  setSelectedItem?: (enabled: any) => any;
  item;
}

const ContractCard = ({ setUpdateModal, setSelectedItem, item }: PropsType) => {
  const company = useAppSelector((state) => state.companyprofile.company);

  return (
    <div className="w-full rounded-lg shadow-card bg-white pt-[18px] pl-4 pr-7 pb-5 flex justify-between items-end relative">
      {item.contract_status === "ACTIVE" && (
        <span className="absolute top-8 right-9 font-bold font-poppins text-base">
          ${item?.hourly_rate}/hr
        </span>
      )}

      {item.contract_status === "INACTIVE" && (
        <div className="absolute top-8 right-9 flex flex-col items-end gap-y-2">
          <BadgeV2>
            {item.contract_status === "INACTIVE" ? "Inactive" : "Contract completed"}
          </BadgeV2>
          <div className="flex items-center gap-3">
            <span className="font-semibold font-inter text-xs text-dark-gray">Dates worked</span>
            <BadgeV2 color="orange">
              {formatDate.yyyy_mm_dd(item.contract_start)}
              {" - "}
              {formatDate.yyyy_mm_dd(
                new Date(item.contract_end).getTime() > new Date(item.inactivated_date).getTime()
                  ? item.inactivated_date
                  : item.contract_end,
              )}
            </BadgeV2>
          </div>
        </div>
      )}

      <div className="flex justify-start gap-x-5 w-full">
        <div>
          <LogoWithDefaultV2 src={company?.logo ?? ""} className="w-14 h-14 rounded-full" />
        </div>
        <div className="flex flex-col gap-y-3 w-full">
          <span className="text-base font-poppins font-bold">{item?.["position"]}</span>
          <div className="flex gap-5 justify-between">
            <AvatarRoleNameGroup
              role={item?.FreelancerProfile?.role}
              user={item?.User}
              avatarSizeClass="w-14 h-14"
            />
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-y-3">
              <div className="flex gap-x-3 items-center">
                <BadgeV2 addClass="h-6 capitalize">{item?.term?.toLowerCase()}</BadgeV2>
                <BadgeV2>{item?.experience_level}</BadgeV2>
                <BadgeV2 addClass="p-2 h-6">
                  ${item?.hourly_rate} /hrs{" "}
                  <span className="capitalize pl-[2px]">{item?.pay_frequency?.toLowerCase()}</span>
                </BadgeV2>
                <BadgeV2 addClass="p-2 h-6">
                  {item?.term_of_hours} /hr{" "}
                  <span className="capitalize pl-[2px]">
                    {item?.term_of_hours_duration?.toLowerCase()}
                  </span>
                </BadgeV2>
                <BadgeV2 addClass="capitalize h-6">{item?.location?.toLowerCase()}</BadgeV2>
              </div>
              <div className="flex gap-x-3 items-center">
                <BadgeV2 addClass=" h-6">{item?.timezone}</BadgeV2>
                <BadgeV2 addClass="p-2 h-6">
                  {formatDate.yyyy_mm_dd(item.contract_start) +
                    " - " +
                    (item.is_ongoing ? "Ongoing" : formatDate.yyyy_mm_dd(item.contract_end))}
                </BadgeV2>
              </div>
            </div>
            <div className="flex gap-x-4 shadow-none">
              {/* <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  setCreateModal(true);
                }}
              >
                Create review
              </Button> */}
              {item?.contract_status === "ACTIVE" && (
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    setUpdateModal && setUpdateModal(true);
                    setSelectedItem && setSelectedItem(item);
                  }}
                >
                  Update contract
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractCard;
