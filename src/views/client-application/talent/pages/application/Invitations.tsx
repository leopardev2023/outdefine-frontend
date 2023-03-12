import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";
import Button from "components/Button/ButtonV2";
import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";
import TalentCardV2 from "../../components/Card.TalentV2";
import TalentSkeleton from "../../components/Talent.Skeleton";

import useTalentProfile from "../../hooks/useTalentProfile";

import jobApi from "network/job";

interface PropsType {
  data?: any[];
  loading?: boolean;
  onRefetch: () => void;
}

export default function TalentInvitations({ data: invitations, loading, onRefetch }: PropsType) {
  const { goToTalentProfile, loading: redirectLoading } = useTalentProfile();

  const declientInvitation = async (
    company_id: number | string,
    job_id: string | number,
    freelancer_id: number | string,
  ) => {
    try {
      const response = await jobApi.addressInvitation(freelancer_id, company_id, job_id, "DECLINE");
      if (response.success) {
        toast.custom(<Toast type="success" message="Declined the invitation" />);
        onRefetch();
      } else {
        throw new Error("Error");
      }
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error, please try again" />);
    }
  };

  if (loading) return <TalentSkeleton />;
  return (
    <>
      <div className="flex flex-col justify-center gap-y-5 items-center bg-background">
        {invitations?.length === 0 && (
          <EmptyPanelV2
            image={"/app/common/spaceboy/astronaut-celebrating.png"}
            title={"No applicants"}
            description={"Create job posts that talent can apply to."}
            imageClassName="w-[150px] h-[155px]"
            className="h-[440px] pt-16"
          >
            <NavLink to={"/talent"} className="mt-6">
              <Button>Find talent</Button>
            </NavLink>
          </EmptyPanelV2>
        )}
        {invitations?.map((item) => (
          <TalentCardV2
            key={item.id}
            talent={{
              ...item.FreelancerProfile,
              User: item.User,
              boosted: item.boosted,
            }}
          >
            <div className="flex gap-x-9 shadow-none ml-16">
              <Button
                className="w-[120px] px-0"
                variant="secondary"
                onClick={() => declientInvitation(item.company_id, item.job_id, item.freelancer_id)}
              >
                Decline
              </Button>
              <Button
                onClick={() => goToTalentProfile(item.freelancer_id)}
                loading={redirectLoading}
                type="button"
                className="w-[120px] px-0"
              >
                Profile
              </Button>
            </div>
          </TalentCardV2>
        ))}
      </div>
    </>
  );
}
