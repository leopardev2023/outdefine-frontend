import { Controller } from "react-hook-form";
import SearchSelect from "./SearchSelect";

interface IFormSearchSelect extends ISearchSelect {
  name: string;
  control: any;
  rules?: Record<string, any>;
  defaultValue?: any;
}

export const FormSearchSelect = ({
  name,
  control,
  rules = {},
  ...props
}: IFormSearchSelect) => {
  return (
    <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange, value } }) => (
        <SearchSelect
            {...props}
            defaultValue={value}
            onChange={onChange}
        />
    )}
    />
  );
};
