import DialCodeInput from "./DialCodeInput";
import { Controller } from "react-hook-form";

interface IFormDialCodeInput extends IDialCodeInput {
  name: string;
  control: any;
  defaultValue?: any;
  rules?: Record<any, any>;
}

export const FormDialCodeInput = ({
  name,
  control,
  rules,
  defaultValue,
  ...props
}: IFormDialCodeInput) => {
  return (
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <DialCodeInput
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            {...props}
          />
        )}
      />
  );
};
