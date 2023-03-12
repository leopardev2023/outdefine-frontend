interface IRadioV2 {
  value: string | number;
  selected?: boolean;
  disabled?: boolean;
  onClick?: Function;
  children?: ReactChildren;
}

interface ICheckBoxV2 {
  value: string | number;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: Function;
  children?: ReactChildren;
}

interface ISwitchV2 {
  status?: boolean;
  disabled?: boolean;
  onClick?: Function;
  children?: ReactChild;
}

interface ILightBlueButton {
  isActive?: boolean;
  onClick?: Function;
  icon?: ReactChild;
  children?: ReactChild;
}
