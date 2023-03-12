import { NavLink, useNavigate } from "react-router-dom";

import Button from "components/Button/ButtonV2";
import ModalV2 from "components/Modal/ModalV2";
import BadgeV2 from "components/V2/Badges/BadgeV2";
import IconButtonV2 from "components/V2/IconButton/IconButtonV2";
import IconV2 from "components/V2/Icons";
import BannerV2 from "views/client-application/profile/components/BannerV2";
import { OverViewCardForOffer } from "../componentsV2/Card.Overview";

import useFetchedOfferDetail from "../hooks/useFetchedOfferDetail";

import formatDate from "helpers/date";
import object from "helpers/object";
import prototype from "helpers/prototype";

export default function OfferDetailViewV2() {
  const { pending, actionType, visibility, skills, offer, fetching, addressOffer, setVisibility } =
    useFetchedOfferDetail();

  const navigate = useNavigate();

  if (fetching || !offer) return <></>;

  console.log("offer:", offer);

  const buttonComponents: Record<any, any> = {
    ACCEPTED: (
      <Button className="h-10 w-[200px]" disabled>
        Accepted
      </Button>
    ),
    DECLINED: (
      <Button className="h-10 w-[200px]" disabled>
        Declined
      </Button>
    ),
    WITHDRAWN: (
      <Button className="h-10 w-[200px]" disabled>
        Withdrawn
      </Button>
    ),
    OFFERED: (
      <>
        <Button
          loading={pending && actionType === "DECLINE"}
          onClick={() => addressOffer("DECLINED")}
          variant="secondary"
          disabled={offer.offer_status !== "OFFERED"}
          className="h-10 w-[200px]"
        >
          Decline offer
        </Button>
        <Button
          loading={pending && actionType === "ACCEPT"}
          onClick={() => addressOffer("ACCEPTED")}
          disabled={offer.offer_status !== "OFFERED"}
          className="h-10 w-[200px]"
        >
          Accept offer
        </Button>
      </>
    ),
  };

  return (
    <>
      <BannerV2
        viewFromTalent
        data={{ is_busy: false, memebers: [], company: offer.Company }}
        viewWithJobPosting
        jobTitle={offer.position}
      />
      <div className="mt-4 flex justify-center gap-8">{buttonComponents[offer.offer_status]}</div>

      <div className="flex justify-center">
        <div className="w-fit grid grid-cols-4 gap-5 mt-11 relative">
          <IconButtonV2
            onClick={() => {
              if (window.history.state) {
                navigate(-1);
              } else {
                navigate("/jobs", { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
              }
            }}
            iconType="BTN-BACK-RECTANGLE"
            className="absolute top-0 -left-20"
          />
          {(() => {
            const iconClassName = "w-8 h-8";

            const quickViews = [
              {
                icon: <IconV2 iconType="CLOCK" iconClassName={iconClassName} />,
                title: "Term",
                value: <>{offer?.term}</>,
              },
              {
                icon: <IconV2 iconType="CLOCK" iconClassName={iconClassName} />,
                title: "Timezone",
                value: <>{offer?.timezone}</>,
              },
              {
                icon: <IconV2 iconType="MONEY-WALLET" iconClassName={iconClassName} />,
                title: "Compensation",
                value: (
                  <span>
                    <span className="flex w-full justify-center items-center mb-[2px]">
                      <IconV2
                        iconType="DOLLAR-BLUE-CIRCLE"
                        iconClassName="w-[17px] h-[17px] block mr-3"
                      />
                      {offer?.hourly_rate}
                      {" /hr"}
                    </span>
                  </span>
                ),
              },
              {
                icon: <IconV2 iconType="MONEY-WALLET" iconClassName={iconClassName} />,
                title: "Compensation",
                value: <span>{offer?.pay_frequency.toLowerCase()}</span>,
              },
              {
                icon: <IconV2 iconType="LOCATION" iconClassName={iconClassName} />,
                title: "Location",
                value: (
                  <span className="first-letter:capitalize">{offer?.location?.toLowerCase()}</span>
                ),
              },
              {
                icon: <IconV2 iconType="EDUCATION" iconClassName={iconClassName} />,
                title: "Experience level",
                value: (
                  <span className="first-letter:capitalize">
                    {offer?.experience_level?.toLowerCase()}
                  </span>
                ),
              },
              {
                icon: <IconV2 iconType="DOCUMENT" iconClassName={iconClassName} />,
                title: "Contract length",
                value: (
                  <span className="first-letter:capitalize">
                    {formatDate.yyyy_mm_dd(offer.contract_start)}
                    {" - "}
                    {offer.is_ongoing ? "Ongoing" : formatDate.yyyy_mm_dd(offer.contract_end)}
                  </span>
                ),
              },
              {
                icon: <IconV2 iconType="CLOCK" iconClassName={iconClassName} />,
                title: "Hours",
                value: (
                  <span className="first-letter:capitalize">
                    {offer.term_of_hours} {" hrs "}
                    {offer.term_of_hours_duration.toLowerCase()}
                  </span>
                ),
              },
            ];

            return quickViews.map((quickView, index) => (
              <OverViewCardForOffer key={"quickview" + index} {...quickView} />
            ));
          })()}
        </div>
      </div>

      <div className="my-[94px] flex">
        <div className="mx-auto w-[886px] bg-white shadow-card rounded-lg p-[32px_32px_56px_32px]">
          <h4 className="font-poppins font-semibold text-base">Welcome note</h4>
          <p className="mt-[10px] font-inter">{offer.welcome_note}</p>
          <h4 className="font-semibold text-base mt-10">Overview</h4>
          <pre className="font-inter mb-[52px] mt-2 whitespace-pre-wrap">{offer.description}</pre>
          <h4 className="font-semibold text-base">Skills</h4>
          <div className="mt-4 flex flex-wrap gap-4 mb-8">
            {prototype
              .getSkillNamesFromIDs(skills, object.safeJsonArray(offer.primary_skills))
              .map((skillName) => (
                <BadgeV2 starInBadge color="pink" addClass="h-6" key={"primary-skill-" + skillName}>
                  {skillName}
                </BadgeV2>
              ))}
            {prototype
              .getSkillNamesFromIDs(skills, object.safeJsonArray(offer.secondary_skills))
              .map((skillName) => (
                <BadgeV2 addClass="h-6" key={"secondary-skill-" + skillName}>
                  {skillName}
                </BadgeV2>
              ))}
          </div>

          <h4 className="font-semibold text-base">Requirements</h4>
          <pre className="mt-[22px] font-inter whitespace-pre-wrap mb-8">{offer.requirements}</pre>

          {/* Duties */}
          <h4 className="font-semibold text-base">Duties</h4>
          <pre className="mt-[22px] font-inter whitespace-pre-wrap">{offer.duties}</pre>
        </div>
      </div>

      {/* Action Button Group */}
      <div className="mt-[94px] pb-20 flex justify-center gap-8">
        {buttonComponents[offer.offer_status]}
      </div>

      <ModalV2 isOpen={visibility}>
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          className="overflow-x-hidden w-[680px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-full h-[530px] rounded-lg relative">
            <img
              src="/app/common/bg-sky.png"
              alt="bg-sky"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 w-full h-full pt-[76px] flex flex-col items-center">
              <h4 className="text-white font-semibold text-2xl w-[420px] text-center">
                Congrats on accepting your offer! You’ve earned 250 tokens!
              </h4>
              <img
                src="/app/common/spaceboy/gamer1.png"
                alt="astro-gamer1"
                className="w-[280px] h-[258px] block mt-2"
                width={280}
                height={258}
              />
              <NavLink to="/jobs/manage" className="mt-8">
                <Button variant="secondary">Lets go!</Button>
              </NavLink>
            </div>
            {/* <IconButtonV2
              onClick={() => {
                navigate("/jobs/manage");
              }}
              iconType="CLOSE-WHITE"
              className="cursor-pointer absolute top-9 right-[52px]"
            /> */}
          </div>
        </div>
      </ModalV2>
    </>
  );
}
