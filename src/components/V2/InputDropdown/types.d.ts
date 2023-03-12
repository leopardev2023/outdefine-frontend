interface IInputDropdownV2 {
  options: IData[];
  text?: string;
  icon?: ReactSVGElement;
  optionValue?: string;
  value: string | number;
  index?: number;
  onChange: (value: string | number, selectedIndex: number) => void;
}
