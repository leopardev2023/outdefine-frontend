import { ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "app/store";

import { ReactComponent as TrustedTalentBadge } from "assets/V2/svg/trusted-talent.svg";

import { updateTalentUser, uploadProfileBanner } from "redux/slices/profile";

import Button from "components/Button/ButtonV2";
import Heading from "components/Heading/HeadingV2";
import TypographyV2 from "components/Typography/TypographyV2";
import IconButtonV2 from "components/V2/IconButton";
import IconV2 from "components/V2/Icons";
import ModalV2 from "components/Modal/ModalV2";

import TripleInfoWithIconsV2 from "views/client-application/profile/components/Bar.TripleInfoWithIconsV2";
import TalentProfileFormV2 from "./Form.TalentProfileV2";

import { default_banners } from "constants/v2/default_images";
import { AvatarWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";
import useDefaultBanner from "../hooks/useDefaultBanner";
import useWindowDimensions from "hooks/utils/useWindowDimensions";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

interface TalentBannerV2 {
  userRole?: string;
}

export default function TalentBannerV2(props: TalentBannerV2): ReactElement {
  // only used for client's talent view to redirect previous page
  const { isMobile, isMedium } = useWindowDimensions();

  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((root: RootState) => root.profile);
  const [modal, setModal] = useState<ITalentBannerModal>({
    visibility: false,
    type: "BANNER",
  });

  const { preBanner, bannerImage, setBannerImage, changeBannerHandler, setPreBanner } =
    useDefaultBanner(profile.User.banner);

  useEffect(() => {
    setPreBanner(profile.User.banner ?? "");
    return () => {};
  }, [modal]);

  const navigate = useNavigate();

  const saveBannerHandler = async () => {
    if (typeof bannerImage === "number") {
      try {
        await dispatch(updateTalentUser({ ...profile.User, banner: bannerImage.toString() }));
        toast.custom(<Toast type="success" message="Successfully uploaded banner image" />);
      } catch (e) {
        toast.custom(<Toast type="error" message="There was an error while uploading banner image" />);
      }
    } else if (bannerImage !== undefined) {
      try {
        await dispatch(uploadProfileBanner(bannerImage));
        toast.custom(<Toast type="success" message="Successfully uploaded banner image" />);
      } catch (e) {
        toast.custom(<Toast type="error" message="There was an error while uploading banner image" />);
      }
    }
    setModal({ visibility: false, type: "BANNER" });
  };

  const { github_link, linkedin_link, website_link } = profile.FreelancerProfileSocialLink;

  return (
    <>
      <div className="w-full mt-14">
        <div
          className={`w-full h-[230px] relative ${
            profile.User.banner ? "" : "bg-odf"
          } rounded-lg`}
        >
          <div className="w-full h-full relative overflow-hidden rounded-lg">
            {profile.User.banner && (
              <img
                src={default_banners[profile.User.banner]?.image ?? profile.User.banner}
                alt="talent banner"
                className="object-cover w-full h-full"
              />
            )}
          </div>

          {/* Edit */}
          {props.userRole === "Freelancer" && (
            <IconButtonV2
              onClick={() => setModal({ type: "BANNER", visibility: true })}
              className={
                `cursor-pointer absolute right-5 flex w-fit p-2 bg-white/75 rounded
                ${isMobile ? "bottom-5" : "top-5"}`
              }
              iconType="EDIT"
              iconClassName="w-4 h-4"
            />
          )}

          {/* Social Group */}
          {(github_link || linkedin_link || website_link) && (
            <div className={
              `absolute right-5 w-fit flex bg-white/75 rounded py-[10px] px-5 gap-6
              ${isMobile ? "top-5" : "bottom-5"}`
            }>
              <a target="_blank" rel="noreferrer" href={github_link ?? "#"} hidden={!github_link}>
                <IconV2 iconType="GITHUB" iconClassName="w-5 h-5" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={linkedin_link ?? "#"}
                hidden={!linkedin_link}
              >
                <IconV2 iconType="LINKEDIN" iconClassName="w-5 h-5" />
              </a>
              <a target="_blank" rel="noreferrer" href={website_link ?? "#"} hidden={!website_link}>
                <IconV2 iconType="PORTFOLIO" iconClassName="w-5 h-5" />
              </a>
            </div>
          )}

          {/* Company Logo and Edit */}
          <div className="z-10 absolute left-1/2 -translate-x-1/2 -bottom-[66px] w-[132px] h-[132px] bg-lighter-gray rounded-full p-4">
            <div className="w-full h-full rounded-full relative">
              <AvatarWithDefaultV2
                src={profile.User.avatar}
                background={profile.User.background_number}
                className={"w-full rounded-full max-w-[142px] mt-auto"}
              />
              {props.userRole === "Freelancer" && (
                <IconButtonV2
                  onClick={() => setModal({ type: "PROFILE", visibility: true })}
                  className="absolute flex bg-white right-1 bottom-4 w-[25px] h-[25px] rounded-[2px] shadow-xl"
                  iconType="EDIT"
                  iconClassName="w-4 h-4 m-auto"
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-[68px] flex flex-col items-center relative">
          {props.userRole !== "Freelancer" && (
            <button
              onClick={() => {
                if (window.history.state) {
                  navigate(-1);
                } else {
                  navigate("/jobs", { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
                }
              }}
              className="absolute left-0 -bottom-14"
            >
              <IconV2 iconType="BACK" iconClassName="w-6 h-6" />
            </button>
          )}
          <Heading variant="h6" bold>
            {(profile.User.first_name ?? "") + " " + (profile.User.last_name ?? "")}
          </Heading>
          <TypographyV2 variant="p1" className="mt-2 leading-6 font-inter text-base font-semibold">
            {profile?.Role?.name ?? ""}
          </TypographyV2>
          <TripleInfoWithIconsV2
            icons={[
              <IconV2 iconType="EDUCATION" />,
              <IconV2 iconType="RATE" />,
              <IconV2 iconType="LOCATION" />,
            ]}
            texts={[
              profile.years_of_experience + " years",
              `$${props.userRole === "Client" ? profile.markup_hourly_rate || profile.hourly_rate : profile.hourly_rate}/hr`,
              profile.city ?? "",
            ]}
            wrapperClass="!gap-4 mt-4 font-inter font-semibold text-sm"
          />
          {/* <Button className='mt-4 w-[440px] h-10'>Message talent</Button> */}
        </div>
      </div>
      <ModalV2
        onClose={() => setModal({ visibility: false, type: "BANNER" })}
        isOpen={modal.visibility}
      >
        {modal.type === "PROFILE" && (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            className={`overflow-x-hidden pb-20 absolute left-1/2 top-[150px] -translate-x-1/2 z-10
            ${isMedium ? "w-11/12" : "w-[720px]"}`}
          >
            <TalentProfileFormV2
              onClose={() => setModal({ visibility: false, type: "PROFILE" })}
              profile={profile}
            />
          </div>
        )}
        {modal.type === "BANNER" && (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            className={`
              overflow-x-hidden absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 md:h-screen h-[calc(100%-124px)] mt-1 md:mt-0
              ${isMedium ? "w-11/12" : "w-[720px]"}
            `}
          >
            <div className="w-full p-[64px_56px_40px_56px] bg-white rounded-lg flex flex-col relative">
              <IconButtonV2
                className="absolute right-7 top-7"
                onClick={() => setModal({ visibility: false, type: "PROFILE" })}
                iconType="CLOSE"
                iconClassName="w-5 h-5"
              />
              <Heading variant="h6" className="font-semibold text-xl leading-[150%] text-center">
                Banner image
              </Heading>
              <div className="mt-9 w-full h-[136px] bg-[#D9D9D9] rounded-lg relative">
                {preBanner && (
                  <img
                    src={default_banners[preBanner]?.image ?? preBanner}
                    alt="company banner"
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
                <div className="absolute top-0 left-0 w-full h-full">
                  <p className="mt-11 text-center text-sm leading-4 font-poppins font-semibold">
                    Upload a banner image
                  </p>
                  <label className="cursor-pointer flex items-center gap-3 px-6 w-fit mx-auto mt-5 h-10 rounded-lg bg-odf text-sm font-semibold font-poppins text-white">
                    <IconV2 iconType="UPLOADWHITE" iconClassName="w-5 h-5" />
                    Upload image
                    <input
                      onChange={changeBannerHandler}
                      type="file"
                      id="banner_upload"
                      accept={".png, .jpg, .jpeg"}
                      multiple={false}
                      hidden
                    />
                  </label>
                </div>
              </div>
              <p className="font-poppins text-sm leading-4 mt-5 text-center">
                Add a banner image or choose one of ours
              </p>
              <div className="mt-9 flex justify-center gap-3 flex-wrap">
                {default_banners.map((banner, index) => (
                  <img
                    onClick={() => {
                      setPreBanner(default_banners[index].image);
                      setBannerImage(index);
                    }}
                    key={"default banner" + index}
                    src={banner.tile}
                    alt={"default banner" + index}
                    width={70}
                    height={70}
                    className="cursor-pointer rounded-md"
                  />
                ))}
              </div>
              <Button
                loading={profile.is_busy}
                onClick={() => saveBannerHandler()}
                className="mt-12 mx-auto w-[186px]"
              >
                Save changes
              </Button>
            </div>
          </div>
        )}
      </ModalV2>
    </>
  );
}
