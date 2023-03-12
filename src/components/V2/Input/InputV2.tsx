import {
  FocusEvent,
  ChangeEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';

import makeFormat from './formatMaker';

const InputV2 = ({
  icon,
  description,
  validators,
  ...props
}: IInputV2): ReactElement => {
  const [focus, setFocus] = useState<boolean>(false);
  const [error, setError] = useState<boolean | undefined>(undefined);

  const strClassName = makeFormat({ ...props, focus, error, icon });

  useEffect(() => {
    if (!validators || validators.length === 0) return;

    // if (props.value === '' || props.value === undefined) return;
    let has_error = false;
    validators.forEach((validator) => {
      if (validator(props.value) === false) {
        has_error = true;
        return;
      }
    });

    setError(has_error);
  }, [props.value, validators]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.disabled || !props.onChange) return;
    props.onChange(e);
  };

  const focusHandler = (e: FocusEvent<HTMLInputElement>) => {
    setFocus(true);
    props.onFocus && props.onFocus(e);
  };

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    props.onBlur && props.onBlur(e);
  };

  return (
    <div className='relative w-full font-inter text-xs'>
      <div className='absolute -translate-y-1/2 top-1/2 left-4'>{icon}</div>
      <input
        {...props}
        onFocus={focusHandler}
        onBlur={blurHandler}
        onChange={onChangeHandler}
        className={strClassName}
      />
      {description && (
        <span className='description absolute top-[56px] left-0 text-[10px] text-dark-gray'>
          {description}
        </span>
      )}
    </div>
  );
};

export default InputV2;
