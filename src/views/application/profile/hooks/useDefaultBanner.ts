import { ChangeEvent, useState } from "react";

const useDefaultBanner = (banner?: string | null) => {
  const [preBanner, setPreBanner] = useState<string | undefined>(banner ?? "");
  const [bannerImage, setBannerImage] = useState<File | number | undefined>();

  const changeBannerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const image = e.target.files[0];

    setBannerImage(image);

    setPreBanner(URL.createObjectURL(image));
  };

  return {
    preBanner,
    bannerImage,
    setPreBanner,
    setBannerImage,
    changeBannerHandler,
  };
};

export default useDefaultBanner;
