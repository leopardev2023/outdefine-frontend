import React, { ChangeEvent, useState } from 'react';
import CalendarIcon from 'assets/svg/calendar.svg';
import InputMask from 'react-input-mask';

interface PropsType {
  name?: string;
  value?: string;
  min?: string;
  mask?: string;
  onChange: (val: any) => void;
  onValidation: (valid: any) => void;
}

enum ValidationError {
  DATE,
  MIN,
  NONE,
}

const DateInput: React.FC<PropsType> = ({
  name = '',
  onChange,
  min = '0-0',
  onValidation,
  mask = '9999-99',
}) => {
  const [validationError, setValidationError] = useState<ValidationError>(
    ValidationError.NONE
  );

  const handleValidate = (e: any) => {
    const value = e.target.value;
    const initialValidation = /^\d{4}-\d{2}$/.test(value);
    if (!initialValidation) setValidationError(ValidationError.DATE);
    const parts = value.split('-');
    if (
      Number(parts[0]) >= 1900 &&
      Number(parts[0]) <= 2050 &&
      Number(parts[1]) >= 1 &&
      Number(parts[1]) <= 12
    ) {
      const minDate = min.split('-');
      if (
        Number(minDate[0]) * 12 + Number(minDate[1]) <=
        Number(parts[0]) * 12 + Number(parts[1])
      ) {
        setValidationError(ValidationError.NONE);
        onValidation({ name: name, valid: true });
      } else {
        setValidationError(ValidationError.MIN);
        onValidation({ name: name, valid: false });
      }
      return;
    }
    setValidationError(ValidationError.DATE);
    onValidation({ name: name, valid: false });
  };

  return (
    <div>
      <div className='relative grid'>
        <InputMask
          name={name}
          placeholder='YYYY-MM'
          type='tel'
          className={`w-full md:min-w-[140px] h-[46px] flex justify-between items-center px-3 shadow-3xl rounded-[15px] ${
            validationError !== ValidationError.NONE
              ? ' !border-red'
              : ' border-none'
          }`}
          onBlur={handleValidate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          mask={mask}
        />
        {validationError === ValidationError.DATE ? (
          <span className='ml-auto text-red'>{`invalid`}</span>
        ) : validationError === ValidationError.MIN ? (
          <span className='ml-auto text-red'>{`invalid`}</span>
        ) : (
          <></>
        )}
        <img
          src={CalendarIcon}
          width='25px'
          height='auto'
          alt='calendar icon'
          className='absolute right-3 top-[10px]'
        />
      </div>
    </div>
  );
};

export default DateInput;
