import { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

import { ReactComponent as LinkedinSvg } from "assets/V2/svg/linkedin.svg";
import { ReactComponent as WebsiteSvg } from "assets/V2/svg/website.svg";
import { ReactComponent as TwitterSvg } from "assets/V2/svg/twitter.svg";
import { ReactComponent as InstagramSvg } from "assets/V2/svg/instagram.svg";

import TypographyV2 from "components/Typography/TypographyV2";
import Heading from "components/Heading/HeadingV2";
import Button from "components/Button/ButtonV2";
import TripleInfoWithIconsV2 from "./Bar.TripleInfoWithIconsV2";
import IconButtonV2 from "components/V2/IconButton";

import LogoModalV2 from "./Modal.LogoV2";
import { default_banners, default_logos } from "constants/v2/default_images";
import IconV2 from "components/V2/Icons";

const className = "hover:scale-150 transition-all duration-150";

const BannerV2: React.FC<ICompanyBannerV2> = (props): ReactElement => {
  const companyProfile = useSelector((state: RootState) => state.companyprofile);

  const profile = props.viewFromTalent && props.data ? props.data : companyProfile;

  const [modal, setModal] = useState<IModalInBanner>({
    type: "BANNER",
    visibility: false,
  });

  const { company, is_busy } = profile;

  return (
    <>
      <div className="w-full mt-14">
        <div className={`w-full h-[230px] relative rounded-lg bg-odf`}>
          {company.banner && (
            <img
              src={default_banners[company.banner]?.image ?? company.banner}
              alt="company banner"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
          {/* Edit */}
          {!props.viewFromTalent && (
            <IconButtonV2
              onClick={() => setModal({ type: "BANNER", visibility: true })}
              className="cursor-pointer absolute top-6 right-5 flex w-fit p-2 bg-white/75 rounded"
              iconType="EDIT"
              iconClassName="w-4 h-4"
            />
          )}

          {/* Social Group */}
          <div className="absolute max-md:top-6 max-md:left-4 md:bottom-3 md:right-5 min-w-fit flex bg-white/75 rounded py-[10px] px-[14px] gap-[14px]">
            {company.CompanySocialLink?.linkedin_link && (
              <a target="_blank" rel="noreferrer" href={company.CompanySocialLink?.linkedin_link}>
                <LinkedinSvg className={className} />
              </a>
            )}
            {company.website && (
              <a target="_blank" rel="noreferrer" href={company.website ?? "#"}>
                <WebsiteSvg className={className} />
              </a>
            )}
            {company.CompanySocialLink?.twitter_link && (
              <a
                target="_blank"
                rel="noreferrer"
                href={company.CompanySocialLink?.twitter_link ?? "#"}
              >
                <TwitterSvg className={className} />
              </a>
            )}
            {company.CompanySocialLink?.instagram_link && (
              <a
                target="_blank"
                rel="noreferrer"
                href={company.CompanySocialLink?.instagram_link ?? "#"}
              >
                <InstagramSvg className={className} />
              </a>
            )}
          </div>

          {/* Company Logo and Edit */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[66px] w-[132px] h-[132px] bg-lighter-gray rounded-full p-2">
            <div className="w-full h-full bg-lighter-gray rounded-full relative">
              {company.logo ? (
                <img
                  src={default_logos[company.logo] ?? company.logo}
                  alt="company logo"
                  className="w-full h-full object-cover block rounded-full"
                />
              ) : (
                <IconV2 iconType="OUTDEF-LOGO" iconClassName="w-full h-full min-w-[40px]" />
              )}
              {!props.viewFromTalent && (
                <IconButtonV2
                  onClick={() => setModal({ type: "LOGO", visibility: true })}
                  className="absolute flex bg-white right-1 bottom-4 w-[25px] h-[25px] rounded-[2px] shadow-xl"
                  iconType="EDIT"
                  iconClassName="w-4 h-4 m-auto"
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-[68px] flex flex-col items-center">
          <Heading variant="h6" bold>
            {props.viewWithJobPosting ? props.jobTitle : company?.name ?? "Company name"}
          </Heading>
          <TypographyV2 variant="p1" className="mt-2 leading-6 font-semibold text-base font-inter">
            {props.viewWithJobPosting ? company?.name : company?.industry}
          </TypographyV2>
          <TripleInfoWithIconsV2
            icons={[
              <IconV2 iconType="COMPANY" iconClassName="w-5 h-5" />,
              <IconV2 iconType="USER" iconClassName="w-5 h-5" />,
              <IconV2 iconType="LOCATION" iconClassName="w-5 h-5" />,
            ]}
            texts={[
              company?.industry ?? "Industry",
              `${company?.number_of_employees ?? ""} employees`,
              company.remote_first ? "Remote" : company?.city ?? "Location",
            ]}
            wrapperClass="!gap-4 justify-center"
          />

          <Button className="mt-4 w-[440px] h-10 hidden">Message company</Button>
        </div>
      </div>
      {!props.viewFromTalent && (
        <LogoModalV2 modal={modal} setModal={setModal} preference={company} is_busy={is_busy} />
      )}
    </>
  );
};

export default BannerV2;
