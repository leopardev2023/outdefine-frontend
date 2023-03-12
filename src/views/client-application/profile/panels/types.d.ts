interface IProfilePanelV2 {
  onTabChange: (tabName: string, actionName: string) => void;
}

interface IEmptyPanelV2 {
  className?: string;
  image: string;
  imageAltText?: string;
  title: string;
  description: string;
  imageClassName?: string;
  children?: ReactElement;
}

interface IGuideModal {
  visibility: boolean;
  step: 1 | 2 | 3 | 4;
}
