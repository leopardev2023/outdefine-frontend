import { ChangeEvent, useState } from "react";

const useDefaultAvatar = (
  avatar?: string | null,
  background?: string | null,
) => {
  const [preAvatar, setPreAvatar] = useState<string | undefined>(avatar ?? "");
  const [avatarImage, setAvatarImage] = useState<File | number | undefined>();
  const [backgroundColor, setBackgroundColor] = useState<string>(
    background ?? "0",
  );

  const changeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const image = e.target.files[0];

    setAvatarImage(image);

    setPreAvatar(URL.createObjectURL(image));
  };

  return {
    preAvatar,
    avatarImage,
    backgroundColor,
    setPreAvatar,
    setBackgroundColor,
    setAvatarImage,
    changeAvatarHandler,
  };
};

export default useDefaultAvatar;
