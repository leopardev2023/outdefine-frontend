import InputV2 from './InputV2';
import { Controller } from 'react-hook-form';

interface IFormInputV2 extends IInputV2 {
  name: string;
  control: any;
  defaultValue?: any;
  rules?: Record<any, any>;
}

export const FormInputV2 = ({
  name,
  control,
  rules,
  className,
  placeholder,
  defaultValue,
  id,
  ...props
}: IFormInputV2) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <InputV2
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            className={className}
            placeholder={placeholder}
            autoComplete='off'
            id={id}
            ref={ref}
            {...props}
          />
        )}
      />
    </>
  );
};
