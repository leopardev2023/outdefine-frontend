interface INewExpCardV2 {
  icon: ReactSVGElement;
  icon_description: string;
  title: string;
  children: ReactElement; // Used for buttons
}

interface IInfoBarV2 {
  texts: string[];
  icons: ReactSVGElement[];
  extraBadges?: JSX.Element[];
  wrapperClass?: string;
  elementClass?: string;
  textWrapperClass?: string;
}

interface ISVGButtonV2 {
  onClick?: MouseEvent<HTMLButtonElement>;
  children: ReactSVGElement | ReactElement;
  wrapperClass?: string;
}

interface ICreateJobModalV2 {
  onClose: any;
}

interface IInputWrapperV2 {
  children: ReactElement;
  wrapperClass?: string;
  label: string;
  labelClass?: string;
  badgeColor: "blue" | "pink" | "orange" | "purple";
  badgeClass?: string;
  badgeStar?: boolean;
  badgeWrapperAddClass?: string;
  badgeTexts?: string[] | number[];
  noBadge?: boolean;
  minusInBadge?: boolean;
  onBadgeClick?: (badge: string) => void;
}

interface IFormDataForJobPosting {
  label: string;
  badgeColor?: "blue" | "pink" | "orange" | "purple";
  badgeData: string[] | number[];
  noBadge?: boolean;
  badgeStar?: boolean;
  minusInBadge?: boolean;
  wrapperClass?: string;
  badgeClass?: string;
  onBadgeClick?: (badge: string) => void;
  children: ReactElement;
}

interface IForm {
  onClose: () => void;
}

interface IJobPostingModal {
  type: "CREATE" | "EDIT" | "DELETE";
  data: IJobPostingV2;
  visibility: boolean;
}

interface IMemberModal {
  type: "INVITE" | "EDIT" | "DELETE";
  visibility: boolean;
  data: ITeamMember;
}

interface IModalInBanner {
  type: "LOGO" | "BANNER";
  visibility: boolean;
}

interface ICompanyLogoImage {
  default: boolean;
  defaultIndex?: number;
  image?: File | number;
}

interface ICompanyBannerImage {
  default: boolean;
  defaultIndex?: number;
  image?: File;
}

interface IReviewCardV2 {
  name: string;
  rating: number;
  description?: string;
  companyName: string;
  position: string;
}

interface IAboutCompanyV2 {
  setModalVisibility?: (visibility: boolean) => void;
  data?: ICompanyProfile;
  viewFromTalent?: boolean;
}

interface ILogoModalV2 {
  is_busy: boolean;
  preference: ICompanyPreference;
  modal: IModalInBanner;
  setModal: (value: IModalInBanner) => void;
}

interface ICompanyLogoV2 {
  src: string;
  className?: string;
}

interface IClientProfileEditModalV2 {
  visibility: boolean;
  setVisibility: (val: boolean) => void;
  profile: IClientProfile;
  pending: boolean;
}

interface IMemberEditModal extends ITeamMember {
  pending: boolean;
  onClose: () => void;
}

interface IJobCardV2 extends IJobPostingV2 {
  companyLogo?: string;
  viewFromTalent?: boolean;
  editable?: boolean;
}

interface ICompanyBannerV2 {
  viewFromTalent?: boolean;
  viewWithJobPosting?: boolean;
  jobTitle?: string;
  data?: ICompanyProfile;
}

interface ISocialBoxV2 {
  viewFromTalent?: boolean;
  data?: ICompanyProfile;
}
