import {
  ReactElement,
  useEffect,
  useState,
} from "react";
import InputV2 from "../Input/InputV2";

const PhoneInput = ({
  prefix = "",
  ...props
}: IPhoneInput): ReactElement => {
  const [savedPrefix, setSavedPrefix] = useState<string>(prefix);
  const [value, setValue] = useState<string>(props?.value?.toString() || "");

  const handleChange = (phone) => {
    setValue(phone);
    props.onChange && props.onChange(phone);
  };

  // Handle prefix Changes
  useEffect(() => {
    const oldPrefix = savedPrefix;
    const newPhone = value.replace(oldPrefix, prefix);
    setSavedPrefix(prefix);
    handleChange(newPhone);
  }, [prefix]);

  // Check if someone tries to delete the prefix
  useEffect(() => {
    const deletedPrefix = !value.startsWith(prefix);
    if (deletedPrefix) handleChange(prefix + value.slice(prefix.length - 1));
  }, [value]);

  return (
    <InputV2 placeholder="Type in your number" {...props} value={value} onChange={(e) => handleChange(e.target.value)} />
  );
};

export default PhoneInput;
