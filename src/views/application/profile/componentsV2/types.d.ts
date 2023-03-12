interface ILabelWrapperV2 {
  label: string;
  children?: ReactElement;
  className?: string;
  badgeColor?: "blue" | "pink" | "orange" | "purple";
  starInBadge?: boolean;
  minusInBadge?: boolean;
  badgeTexts?: string[];
  smallBadge?: boolean;
  onBadgeClick?: (badge: string) => void;
}

interface IRemovalCardV2 {
  paddingClass: string;
  children: ReactElement;
  heading: string;
  description: string;
  onRemove: () => void;
  onClose: () => void;
  is_busy: boolean;
}

interface ITalentProfileFormV2 {
  formType?: "CREATE" | "EDIT";
  profile: ITalentProfileV2;
  onManualChange?: (name: string, value: string) => void;
  onSocialChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onInputChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClose: () => void;
}

interface IExperienceForm {
  formType: "CREATE" | "EDIT" | "REMOVE";
  experience: ITalentExperience;
  onClose: () => void;
}

interface IEducationForm {
  formType: "CREATE" | "EDIT" | "REMOVE";
  education: ITalentEducation;
  onClose: () => void;
}

interface IPortfolioForm {
  formType: "CREATE" | "EDIT" | "REMOVE" | "VIEW";
  project: ITalentPortfolio;
  onClose: () => void;
}

interface ITalentExpCard extends ITalentExperience {
  children?: ReactElement;
}

interface IPortfolioDetailView {
  onClose: () => void;
  data: ITalentPortfolio;
}

interface ITalentBannerModal {
  visibility: boolean;
  type: "BANNER" | "PROFILE";
}

interface ITalentBadgeCardV2 {
  badgeType: "TRUSTED-TALENT";
  imageClassName: string;
  date: Date;
}
