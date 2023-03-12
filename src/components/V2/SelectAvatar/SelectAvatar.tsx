
import { useEffect, useState } from "react";

import OnboardAPI from "network/onboarding";
import { default_men_avatars, default_women_avatars } from "constants/v2/default_images";
import UploadPanel from "../../../views/onboardingV2/client/AboutMyself/UploadPanel";
import Loader from "../Loader/Loader";
import Avatar from "./Avatar";
import { ISelectAvatar, ISelectAvatarValue } from "./type";
import IconV2 from "../Icons/IconV2";

const LeftArrow = ({ hidden = false, onClick }) => (
  <div className="w-[7px] mr-[10px] lg:mr-0 hover:cursor-pointer" onClick ={hidden ? undefined : onClick}>
    {!hidden && <IconV2 iconType="SCROLL-LEFT-ARROW" />}
  </div>);

const RightArrow = ({ hidden = false, onClick }) => (
  <div className="w-[7px] ml-[10px] lg:ml-0 hover:cursor-pointer" onClick ={hidden ? undefined : onClick}>
    {!hidden && <IconV2 iconType="SCROLL-RIGHT-ARROW" />}
  </div>
);

const SelectAvatar = ({ onChange, withS3, defaultValue = {}, offset = 5 }: ISelectAvatar) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [womenStart, _setWomenStart] = useState<number>(0);
  const nextWomens = () => _setWomenStart(womenStart + offset);
  const previousWomens = () => _setWomenStart(womenStart - offset);
  const [menStart, _setMenStart] = useState<number>(0);
  const nextMens = () => _setMenStart(menStart + offset);
  const previousMens = () => _setMenStart(menStart - offset);
  const [bgStart, _setBgStart] = useState<number>(0);
  const nextBgs = () => _setBgStart(bgStart + offset);
  const previousBgs = () => _setBgStart(bgStart - offset);
  const currentWomens = default_women_avatars.slice(womenStart, womenStart + offset);
  const currentMens = default_men_avatars.slice(menStart, menStart + offset);
  const currentBgs = Array(6).fill(0).slice(bgStart, bgStart + offset);
  const [value, _setValue] = useState<ISelectAvatarValue>(defaultValue);
  const setValue = (v) => {
    _setValue(v);
    if (onChange) onChange(v);
  };
  const { sampleAvatar, avatarImage, bgIndex } = value;

  const handleUpload = (_, selectedFiles) => setValue({ avatarImage: selectedFiles[0], bgIndex });
  const onSampleAvatar = (index, type) => {
    const sample = { type, index };
    setValue({ sampleAvatar: sample, bgIndex });
  };
  const onBgClick = (bgIndex) => setValue({ ...value, bgIndex });

  let previewImage;
  if (sampleAvatar) {
    previewImage = sampleAvatar.type === "men"
      ? default_men_avatars[sampleAvatar.index]
      : default_women_avatars[sampleAvatar.index];
  } else if (typeof avatarImage === "string") previewImage = avatarImage; // S3 link case
  else if (avatarImage) previewImage = URL.createObjectURL(avatarImage); // File case

  // Get S3 url if requested
  useEffect(() => {
    if (!withS3) return;
    if (typeof avatarImage === "string" || !avatarImage) return;

    const s3Upload = async () => {
      try {
        setLoading(true);
        const avatarFromS3 = await OnboardAPI.uploadUserAvatarLogo(avatarImage);
        setValue({ avatarImage: avatarFromS3.data.avatar, bgIndex });
      } catch (e) {
        console.log("Avatar upload to s3 failed with: ", e);
      } finally {
        setLoading(false);
      }
    };
    s3Upload();
  }, [avatarImage]);

  return (
    <div className='flex flex-col lg:flex-row gap-y-4 items-center lg:items-start mt-3 lg:mt-9'>
        {/* UPLOAD SECTION */}
        { loading

          ? <div className="w-[300px]"><Loader /></div>
          : <UploadPanel
            handleUpload={handleUpload}
            className='shrink-0'
            background={sampleAvatar ? `/onboard/client/avatars/banner/${bgIndex}.png` : ``}
            sampleAvatar={previewImage}
        />
        }

        <div className='relative flex flex-col items-center ml-0 lg:ml-10 mt-[33px] lg:mt-0 w-full lg:w-[400px]'>
            {/* Sample avatars */}
            <div className='flex items-center gap-x-[3px] md:gap-x-[14px] w-fit '>
              <LeftArrow hidden={womenStart === 0} onClick={previousWomens} />
              {currentWomens.map((url, index) => (
                <Avatar
                  url={url}
                  onClick={() => onSampleAvatar(womenStart + index, "women")}
                  className='hover:bg-odf-light transition-all duration-100'
                  key={index + offset}
                  />
              ))}
              <RightArrow onClick={nextWomens} hidden={womenStart + offset >= default_women_avatars.length}/>
            </div>
            <div className='flex items-center gap-x-[3px] md:gap-x-[14px] w-fit mt-6 '>
              <LeftArrow hidden={menStart === 0} onClick={previousMens} />
              {currentMens.map((url, index: number) => (
                <Avatar
                  url={url}
                  onClick={() => onSampleAvatar(menStart + index, "men")}
                  className='hover:bg-odf-light transition-all duration-100'
                  key={index + offset}
                />
              ))}
              <RightArrow onClick={nextMens} hidden={menStart + offset >= default_men_avatars.length} />
            </div>

            {/* Sample backgrounds */}
            <div className='font-poppins font-normal text-sm mt-5 text-center w-full'>
                Choose a background color
            </div>

            <div className='flex items-center gap-x-[3px] md:gap-x-[14px] w-fit mt-6'>
              <LeftArrow hidden={bgStart === 0} onClick={previousBgs} />
              {currentBgs.map((_, index: number) =>
                <Avatar
                  url={`/onboard/client/avatars/banner/${bgStart + index}.png`}
                  className='hover:border-none transition-all duration-100'
                  innerClass={ bgStart === 5 ? "border border-theme" : ""} // White bg needs border
                  onClick={() => onBgClick(bgStart + index)}
                  key={index + offset}
                />)
              }
              <RightArrow onClick={nextBgs} hidden={bgStart + offset >= 6} />
            </div>

        </div>
    </div>
  );
};

export default SelectAvatar;
