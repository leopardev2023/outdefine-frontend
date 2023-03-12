import DropdownV2 from './DropdownV2';
import { Controller } from 'react-hook-form';
import BadgeV2 from '../Badges/BadgeV2';

interface IFormDropdownV2 extends IDropdownV2 {
  name: string;
  control: any;
  rules?: Record<string, any>;
  withBadge?: boolean;
  badgeClass?: string;
  defaultValue?: any;
}

export const FormDropdownV2 = ({
  name,
  control,
  rules = {},
  data,
  placeholder,
  withBadge = false,
  badgeClass = '',
  defaultValue,
  ...props
}: IFormDropdownV2) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <div>
            <DropdownV2
              {...props}
              data={data}
              onChange={onChange}
              selectedIndex={value}
              placeholder={placeholder}
            />
            {withBadge && value !== undefined ? (
              <BadgeV2 addClass={badgeClass}>
                {data[value]?.value ?? ''}
              </BadgeV2>
            ) : null}
          </div>
        )}
      />
    </>
  );
};
