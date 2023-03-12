import * as Sentry from '@sentry/react';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

import { getProfileId } from 'utils/storageUtils';
import AuthUtils from 'utils/authUtils';

import { InputBox } from 'components/forms';
import Button from 'components/Button/ButtonV2';
import Heading from 'components/Heading/HeadingV2';
import TypographyV2 from 'components/Typography/TypographyV2';
import InputV2 from 'components/V2/Input/InputV2';
import "./styles.scss";

const ResetPassword = () => {
  const [isLoading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleResetPassword = async (event: any) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.custom(<Toast type="error" message="Please confirm the password" />);
      return;
    }
    try {
      const email = getProfileId();
      await Auth.forgotPasswordSubmit(
        email || '',
        code,
        password
      );
      toast.custom(<Toast type="success" message="Password changed successfully. Please try to log in with the new password." />);
      navigate('/login');
    } catch (err) {
      Sentry.captureException(err);

      toast.custom(<Toast type="success" message={AuthUtils.getAuthError(err)} />);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen resetPassword-background'>
        <Heading className='text-white text-[20px] font-semibold font-poppins mt-[73px]' variant='h6'>
          Reset Password
        </Heading>
        <div className='flex flex-col justify-center items-center w-[370px] md:w-[495px] rounded-[15px] bg-white p-6 mt-8'>
          <TypographyV2 className='font-semibold ' variant='p1'>
            A verification email of your password change will be sent to your
            email
          </TypographyV2>
          <form
            onSubmit={handleResetPassword}
            className='flex flex-col w-full justify-center items-center mt-5 gap-y-[11px]'
          >
            <label className='self-start font-semibold text-label'>
              Verification Code
            </label>
            <InputV2
              name='code'
              type='text'
              required
              placeholder='Code'
              onChange={(e) => setCode(e.target.value)}
              value={code}
              className='w-full'
            />
            <label className='self-start font-semibold text-label'>
              New password
            </label>
            <InputV2
              name='password'
              type='password'
              required
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='w-full'
            />
            <label className='self-start font-semibold text-label'>
              Confirm new password
            </label>
            <InputV2
              name='confirmPassword'
              type='password'
              required
              placeholder='Confirm password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className='w-full'
            />
            <Button
              type='submit'
              loading={isLoading}
              className='mt-5'
            >Reset password</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
