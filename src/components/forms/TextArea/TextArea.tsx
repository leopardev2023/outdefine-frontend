import React, { useState } from 'react';

interface Props {
  name?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: any) => void;
  optional?: boolean;
}

const TextArea: React.FC<Props> = ({
  name = '',
  placeholder = '',
  className = '',
  value = '',
  onChange = undefined,
  optional = false,
}) => {
  const [isValid, setValid] = useState<boolean>(true);
  const onInputValidate = (e) => {
    if (e.target.value === '') setValid(false);
    else setValid(true);
  };

  return (
    <>
      <div className={`relative grid ${className}`}>
        <textarea
          name={name}
          placeholder={placeholder}
          rows={4}
          cols={60}
          value={value}
          onChange={onChange}
          onBlur={onInputValidate}
          maxLength={200}
          className={`w-full h-[108px] bg-white rounded-[15px] shadow-3xl ${
            !isValid && !optional ? '!border-solid !border-red' : 'border-none'
          }`}
        ></textarea>
        <div className='absolute right-2 bottom-2 text-sm text-gray-600'>
          Max (200)
        </div>
      </div>
      {!isValid && !optional && (
        <span className='text-red text-[16px] font-normal ml-auto'>
          {' '}
          required *{' '}
        </span>
      )}
    </>
  );
};

export default TextArea;
