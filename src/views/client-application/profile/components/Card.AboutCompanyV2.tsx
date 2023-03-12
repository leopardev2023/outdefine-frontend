import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

import Heading from "components/Heading/HeadingV2";
import TypographyV2 from "components/Typography/TypographyV2";
import BadgeV2 from "components/V2/Badges/BadgeV2";

import { ReactComponent as EditSvg } from "assets/V2/svg/edit.svg";

const AboutCompanyV2: React.FC<IAboutCompanyV2> = (props): ReactElement => {
  const companyProfileData = useSelector((root: RootState) => root.companyprofile);
  const companyProfile = props.viewFromTalent
    ? props.data ?? companyProfileData
    : companyProfileData;

  return (
    <>
      <section className="mt-[62px] w-full pt-5 pb-4 px-9 bg-white rounded-lg shadow-card relative">
        {!props.viewFromTalent && (
          <div
            onClick={() => props.setModalVisibility && props.setModalVisibility(true)}
            className="cursor-pointer absolute top-5 right-5 w-8 h-8 rounded bg-[#F4F4F4] flex"
          >
            <EditSvg className="w-4 h-4 m-auto" />
          </div>
        )}

        <Heading variant="h6" className="font-semibold">
          About {companyProfile?.company?.name ?? ""}
        </Heading>
        <pre
          className={`mt-2 min-h-[70px] text-sm font-inter pb-2 whitespace-pre-wrap ${
            !!companyProfile.company.summary ? "" : "text-dark-gray"
          }`}
        >
          {!!companyProfile.company?.summary
            ? companyProfile.company.summary
            : props.viewFromTalent
            ? "No description"
            : "Tell talent about your company"}
        </pre>
        <BadgeV2 addClass="w-fit px-2 h-6">{companyProfile.company.industry ?? ""}</BadgeV2>

        <div className="mt-3 flex gap-32">
          <div>
            <TypographyV2 variant="p1" className="font-semibold text-sm font-poppins">
              Company stage
            </TypographyV2>
            <BadgeV2 addClass="mt-[6px] w-fit px-2 h-6">
              {companyProfile.company?.stage ?? ""}
            </BadgeV2>
          </div>
          <div>
            <TypographyV2 variant="p1" className="font-semibold text-sm font-poppins">
              Number of employees
            </TypographyV2>
            <BadgeV2 addClass="mt-[6px] w-fit px-2 h-6">
              {companyProfile.company?.number_of_employees ?? ""}
            </BadgeV2>
          </div>
        </div>

        <div className="mt-3">
          <TypographyV2 variant="p1" className="font-semibold text-sm font-poppins">
            Location
          </TypographyV2>
          <BadgeV2 addClass="mt-[6px] w-fit px-2 h-6">
            {companyProfile.company.remote_first ? "Remote" : companyProfile.company.city ?? ""}
          </BadgeV2>
        </div>
      </section>
    </>
  );
};

export default AboutCompanyV2;
