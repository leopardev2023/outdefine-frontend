import { ReactElement, useState } from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";
import DropdownV2 from "../Dropdown/DropdownV2";

export const dialCodes = getCountries().map((country, index) => {
  const code = `+${getCountryCallingCode(country)}`;
  return (
    {
      id: index,
      value: `${en[country]} ${code}`,
      code,
    });
});

const DialCodeInput = ({
  ...props
}: IDialCodeInput): ReactElement => {
  const [index, setIndex] = useState<number>(Number(props?.value?.id));
  const onChange = (idx): void => {
    const value : any = dialCodes[idx];
    props.onChange && props.onChange(value);
    setIndex(idx);
  };

  return <DropdownV2
    data={dialCodes}
    {...props}
    selectedIndex={isNaN(index) ? undefined : index}
    onChange={onChange}
  />
  ;
};

export default DialCodeInput;
