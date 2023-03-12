interface ISearchDropdown {
  displayName?: string;
  data: Array<any>;
  directionUp?: boolean;
  selectedIndex?: number;
  selectedValue?: string | number;
  onChange: (idx: number) => void;
  placeholder: string;
  icon?: HTMLImageElement | SVGElement | ReactElement; // 20 x 20
  suffixValue?: string;
  disabled?: boolean;
}

interface IIClassMaker extends ISearchDropdown {
  open: boolean;
}

interface IFormats {
  button: string;
  marker: any;
}
