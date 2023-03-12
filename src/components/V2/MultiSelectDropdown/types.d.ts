interface IMultiDropdownV2 {
  icon?: ReactSVGElement;
  buttonClassName?: string;
  listClassName?: string;
  listData: Array<IData>;
  selectedData: Array<IData>;
  buttonText?: string;
  onChange: Function;
  directionUp?: boolean;
  filterDropdown?: boolean;
}

interface IData {
  index: number;
  value: string | number;
}
