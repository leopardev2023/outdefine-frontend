interface ICountryInputV2 extends React.InputHTMLAttributes<HTMLInputElement> {
  onCountryChange?: (value: string) => void;
  value?: string;
  icon?: any;
  directionUp?: boolean;
}
