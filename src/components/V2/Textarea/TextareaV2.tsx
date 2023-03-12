import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import makeFormat from './formatMaker';

interface IFormTextareaV2 extends ITextareaV2 {
  name: string;
  control: any;
  rules?: Record<string, any>;
  defaultValue?: any;
}

export const FormTextareaV2 = ({
  name,
  control,
  rules,
  defaultValue,
  ...props
}: IFormTextareaV2) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <TextareaV2 {...props} value={value} onChange={onChange} />
      )}
    />
  );
};

const TextareaV2 = (props: ITextareaV2): ReactElement => {
  const [focus, setFocus] = useState<boolean>(false);
  const [error, setError] = useState<boolean | undefined>(undefined);

  const strClassName = makeFormat({ ...props, focus, error });

  useEffect(() => {
    if (!props.validators || props.validators.length === 0) return;

    if (props.value === '' || props.value === undefined) return;
    let has_error = false;
    props.validators.forEach((validator) => {
      if (validator(props.value) === false) {
        has_error = true;
        return;
      }
    });

    setError(has_error);
  }, [props.value]);

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (props.disabled || !props.onChange) return;
    props.onChange(e);
  };

  return (
    <div className={`relative `}>
      <textarea
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        name={props.name ?? ''}
        onChange={onChangeHandler}
        value={props.value}
        disabled={props.disabled}
        className={`resize-none w-full ${strClassName ?? ''}`}
        placeholder={props?.placeholder}
      />
      {props.description && (
        <span className='description absolute -bottom-5 left-0 text-[10px] text-dark-gray'>
          {props?.description}
        </span>
      )}
      {props.limitText && (
        <span className='text-xs font-inter text-[#8A8A8A] tracking-[-0.25px] absolute bottom-5 right-4'>
          {props.limitText}
        </span>
      )}
    </div>
  );
};

export default TextareaV2;
