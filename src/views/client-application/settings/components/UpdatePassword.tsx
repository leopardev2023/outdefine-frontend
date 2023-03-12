import * as Sentry from '@sentry/react';
import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Transition } from '@headlessui/react';
import AuthUtils from 'utils/authUtils';
import Heading from 'components/Heading/HeadingV2';
import Button from 'components/Button/ButtonV2';
import InputV2 from 'components/V2/Input/InputV2';
import { ReactComponent as KeyIcon } from 'assets/settings/key.svg';
import CaretIcon from '../Icons/Caret';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const validator = (arg: any) => {
    if (arg === undefined) return false;
    return true;
  };

  const handleSaveClick = async (event: any) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.custom(<Toast type="error" message="Password did not matchn" />);
      setError(true);
      return;
    }
    try {
      await Auth.currentAuthenticatedUser()
        .then((user) => {
          return Auth.changePassword(user, currentPassword, password);
        })
        .then((data) => {
          toast.custom(<Toast type="success" message="Your password was successfully updated" />);
          setError(false);
        })
        .catch((err) => {
          toast.custom(<Toast type="error" message={AuthUtils.getAuthError(err)} />);
          setError(true);
        });
    } catch (err) {
      Sentry.captureException(err);
      toast.custom(<Toast type="error" message={AuthUtils.getAuthError(err)} />);
      setError(true);
    }
  };

  return (
    <div className='mt-[62px] w-full bg-white rounded-lg shadow-card p-[18px_56px_16px_36px] relative'>
      <Heading variant='h6' className='font-semibold text-xl leading-[30px]'>
        Settings
      </Heading>
      <div className='flex h-full w-full py-6 text-lg'>
        <div className='cursor-pointer pl-5 pr-4 flex items-center  justify-between'>
          <KeyIcon />
        </div>
        <div
          className={`text-sm px-6 bg-white/0 w-full font-poppins font-semibold shadow-none rounded-none border-0 ${
            !open ? 'border-b-[1px]' : ''
          }`}
        >
          Update your password
        </div>
        <div
          onClick={() => {
            setCurrentPassword('');
            setPassword('');
            setConfirmPassword('');
            setOpen(!open);
            setError(false);
          }}
          className={`cursor-pointer pl-5 pr-4 flex items-center  justify-between text-xs ${
            open ? 'text-black' : 'text-[#8A8A8A]'
          }`}
        >
          <CaretIcon open={open} />
        </div>
      </div>

      <Transition
        show={open}
        leave='transition ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='mt-3 px-10'>
          <div className='mt-4 font-poppins text-xs'>Current Password</div>
          <InputV2
            placeholder='Current Password'
            type='password'
            required
            value={error ? undefined : currentPassword}
            validators={[validator]}
            onChange={(e) => {
              setError(false);
              setCurrentPassword(e.target.value);
            }}
            className='mt-6 w-[274px]'
          />
          <div className='mt-4 font-poppins text-xs'>New Password</div>
          <InputV2
            placeholder='New Password'
            type='password'
            required
            value={error ? undefined : password}
            validators={[validator]}
            onChange={(e) => {
              setError(false);
              setPassword(e.target.value);
            }}
            className='mt-6 w-[274px]'
          />
          <div className='mt-4 font-poppins text-xs'>Confirm new password</div>
          <InputV2
            placeholder='Confirm Password'
            type='password'
            required
            value={error ? undefined : confirmPassword}
            validators={[validator]}
            onChange={(e) => {
              setError(false);
              setConfirmPassword(e.target.value);
            }}
            className='mt-6 w-[274px]'
          />
          <div className='flex items-center justify-center w-[338px]'>
            <Button
              onClick={handleSaveClick}
              children='Save changes'
              className='mt-8 w-[185px] h-[50px] flex items-center justify-center bg-theme rounded-[10px] text-base font-semibold text-white'
            />
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default UpdatePassword;
