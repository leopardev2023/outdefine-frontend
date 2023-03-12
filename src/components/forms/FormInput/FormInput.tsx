import React, { useState } from 'react';
import InputBox from '../InputBox';

interface PropsType {
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  height?: string;
  className?: string;
  value?: string;
  onClick?: () => void;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  icon?: any;
  disabled?: boolean;
  stress?: boolean;
  rule?: any;
}

enum ValidationErrors {
  NONE,
  REQUIRED,
  INVALID,
}

const FormInput: React.FC<PropsType> = ({
  name = '',
  label = '',
  type = 'text',
  placeholder = '',
  className = '',
  height = '40px',
  value = '',
  onClick = undefined,
  onChange = undefined,
  onBlur = undefined,
  icon = undefined,
  stress = false,
  disabled = false,
  rule = undefined,
}) => {
  const [isValid, setValid] = useState<ValidationErrors>(ValidationErrors.NONE);
  const onInputValidate = (e) => {
    if (e.target.value === '') setValid(ValidationErrors.REQUIRED);
    else if (rule && !rule.test(e.target.value))
      setValid(ValidationErrors.INVALID);
    else setValid(ValidationErrors.NONE);
  };
  return (
    <div className={`relative flex flex-col w-full ${className}`}>
      <label
        className={`pl-2 mb-3 font-semibold font-inter`}
      >
        {label}
      </label>
      <InputBox
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onClick={onClick}
        onChange={onChange}
        onBlur={onInputValidate}
        className={`font-inter text-[14px] font-normal h-[${height}] ${
          isValid === ValidationErrors.NONE
            ? 'border-none'
            : '!border-solid !border-red'
        }`}
        disabled={disabled}
      />
      {(isValid === ValidationErrors.REQUIRED && (
        <span className='text-red text-[16px] font-normal ml-auto'>
          {' '}
          required *{' '}
        </span>
      )) ||
        (isValid === ValidationErrors.INVALID && (
          <span className='text-red text-[16px] font-normal ml-auto'>
            {' '}
            invalid{' '}
          </span>
        )) ||
        (isValid === ValidationErrors.NONE && null)}
      {icon && <div className='w-10 h-10 absolute right-0 top-6'>{icon}</div>}
    </div>
  );
};

export default FormInput;
