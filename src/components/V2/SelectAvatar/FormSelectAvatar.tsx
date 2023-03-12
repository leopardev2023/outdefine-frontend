import { Controller } from "react-hook-form";
import SelectAvatar from "./SelectAvatar";
import { ISelectAvatar } from "./type";

interface IFormSelectAvatar extends ISelectAvatar {
  name: string;
  control: any;
  rules?: Record<string, any>;
}

export const FormSelectAvatar = ({
  name,
  control,
  rules = {},
  ...props
}: IFormSelectAvatar) => {
  return (
    <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange, value } }) => (
        <SelectAvatar
            {...props}
            defaultValue={value}
            onChange={onChange}
        />
    )}
    />
  );
};
