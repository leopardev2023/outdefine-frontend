interface IMultiOptionDropdownV2 {
  data: Array<{ index: number; value: string }>;
  directionUp?: boolean;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  icon?: HTMLImageElement | SVGElement | ReactElement; // 20 x 20
}

interface IMultiDropdownClassMakerFor extends IMultiOptionDropdownV2 {
  open: boolean;
}
