import PhoneInput from "./PhoneInput";
import { Controller } from "react-hook-form";

interface IFormPhoneInput extends IPhoneInput {
  name: string;
  control: any;
  defaultValue?: any;
  rules?: Record<any, any>;
}

export const FormPhoneInput = ({
  name,
  control,
  rules,
  defaultValue,
  id,
  ...props
}: IFormPhoneInput) => {
  return (
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <PhoneInput
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            autoComplete='off'
            id={id}
            ref={ref}
            {...props}
          />
        )}
      />
  );
};
