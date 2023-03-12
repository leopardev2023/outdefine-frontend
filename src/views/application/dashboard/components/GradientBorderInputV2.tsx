import validateEmail from 'helpers/validations/email';
import {
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

import './style.css';

const GradientBorderInputV2 = (props: IEmailsInput): ReactElement => {
  const [active, setActive] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onCurrentChange(e.target.value);
    setValid(
      validateEmail(e.target.value) && !props.data.includes(e.target.value)
    );
  };

  useEffect(() => {
    setValid(
      validateEmail(props.currentValue) &&
        !props.data.includes(props.currentValue)
    );
  }, []);

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (props.currentValue === '') return;

      if (props.data.includes(props.currentValue)) {
        toast.custom(<Toast type="warning" message="Email address duplicated" />);
        return;
      }
      if (validateEmail(props.currentValue)) {
        props.onChange([...props.data, props.currentValue]);
        props.onCurrentChange('');
        setValid(false);
      } else {
        toast.custom(<Toast type="error" message="Email address is not valid or empty" />);
      }
    }
    if (e.key === 'Escape') {
      props.onCurrentChange('');
      setActive(false);
    }
  };

  const removeHandler = (email: string) => {
    const new_data = props.data.filter((elem) => elem !== email);
    props.onChange(new_data);
  };

  return (
    <div className='h-[150px] rounded-lg gradient-box p-[1px]'>
      <div
        onClick={() => setActive(true)}
        className='w-full min-h-full bg-white rounded-lg px-3 py-[10px]'
      >
        <div className='flex h-full gap-x-4 gap-y-2 flex-wrap text-white text-xs'>
          {props.data.map((email, index) => (
            <span
              onClick={() => removeHandler(email)}
              key={email + index}
              className={`group relative cursor-pointer h-[25px] px-4 hover:bg-coral-red  bg-odf rounded-lg flex gap-[6px] items-center`}
            >
              {email}
              <span className='w-3 h-[2px] rounded-full bg-white' />
            </span>
          ))}
          {active && (
            <input
              placeholder='Enter email'
              autoFocus
              onKeyDown={keyDownHandler}
              onChange={changeHandler}
              value={props.currentValue}
              className={`z-10 w-[150px] h-[25px] px-4 text-xs ${
                valid
                  ? 'bg-blue2/40 border-blue2/80'
                  : props.currentValue === ''
                  ? 'bg-white border-lighter-black'
                  : 'bg-error/40 border-error/70'
              } border-[1px] font-inter text-black rounded-lg shadow-none`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GradientBorderInputV2;
