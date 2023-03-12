interface ISampleAvatar {
  type: "men" | "women";
  index: number;
}

export interface ISelectAvatarValue {
  sampleAvatar?: ISampleAvatar;
  avatarImage?: File | string; // might be a File Object or s3 url
  bgIndex?: number;
}

export interface ISelectAvatar {
  onChange?: (value: ISelectAvatarValue) => void;
  offset?: number; // amount of avatars to display
  withS3?: boolean; // true if you want an s3 url instead of File for avatarImage
  defaultValue?: ISelectAvatarValue;
}
