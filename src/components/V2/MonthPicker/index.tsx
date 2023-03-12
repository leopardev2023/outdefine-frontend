import { useEffect, useRef } from 'react';
import InputV2 from '../Input/InputV2';
import MonthPicker from 'react-month-picker';
import { Controller } from 'react-hook-form';

const lang = {
  months: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  from: 'From',
  to: 'To',
};

type YearMonth = {
  year: number;
  month: number;
};

type Props = {
  value?: YearMonth;
  onChange?: Function;
  icon?: any;
  directionUp?: boolean;
  id?: string;
};

interface IFormMonthPickerV2 extends Props {
  name: string;
  control: any;
  rules?: Record<string, any>;
  defaultValue?: any;
}

export const FormMonthPickerV2 = ({
  name,
  control,
  rules = {},
  defaultValue,
  ...props
}: IFormMonthPickerV2) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={
        defaultValue ?? {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
        }
      }
      render={({ field: { value, onChange } }) => (
        <MonthPickerV2 {...props} value={value} onChange={onChange} />
      )}
    />
  );
};

const MonthPickerV2 = (props: Props) => {
  const { id, value, onChange, directionUp } = props;
  const monthPickerRef = useRef(null);

  const showMonthPicker = () => {
    if (monthPickerRef && monthPickerRef.current) {
      (monthPickerRef.current as any).show();
    }
  };
  const hideMonthPicker = () => {
    if (monthPickerRef && monthPickerRef.current) {
      (monthPickerRef.current as any).dismiss();
    }
  };

  const handleMonthPickerChange = (...args) => {
    const payload = { year: args[0], month: args[1] };
    onChange && onChange(payload);
    hideMonthPicker();
  };

  useEffect(() => {
    if (directionUp && id) {
      const elements = document.getElementsByClassName(id);
      if (elements && elements.length > 0) {
        const rmpPad = elements[0].querySelector('.rmp-pad');
        rmpPad && (rmpPad.className += ' direction-up');
        const rmpPopup = elements[0].querySelector('.rmp-cell');
        console.log(rmpPopup);
        rmpPopup && (rmpPopup.className += ' direction-up');
      }
    }
  }, [directionUp, id]);

  return (
    <div className={`${props.id ?? ''}`}>
      <MonthPicker
        lang={lang.months}
        ref={monthPickerRef}
        value={value}
        onChange={handleMonthPickerChange}
        years={{ min: 1970 }}
      >
        <InputV2
          icon={props.icon}
          onClick={showMonthPicker}
          className='w-full h-12 text-sm border border-dark-gray'
          placeholder='MM/YYYY'
          autoComplete='off'
          value={`${(value?.month + '').padStart(2, '0')}/${value?.year}`}
        />
      </MonthPicker>
    </div>
  );
};

export default MonthPickerV2;
