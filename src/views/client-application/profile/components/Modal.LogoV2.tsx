import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/store';
import {
  updateCompanyBanner,
  updateCompanyLogo,
  updateCompanyProfile,
} from 'redux/slices/companyProfile';

import Button from 'components/Button/ButtonV2';
import Heading from 'components/Heading/HeadingV2';
import ModalV2 from 'components/Modal/ModalV2';
import IconButtonV2 from 'components/V2/IconButton';
import IconV2 from 'components/V2/Icons/IconV2';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

import { LogoWithDefaultV2 } from '../../components/Images.WithDefaultV2';

import { default_banners, default_logos } from 'constants/v2/default_images';

export default function LogoModalV2({
  modal,
  preference,
  is_busy,
  setModal,
}: ILogoModalV2): ReactElement {
  const dispatch = useDispatch<AppDispatch>();

  const [preLogo, setPreLogo] = useState<string | undefined>(preference.logo);
  const [preBanner, setPreBanner] = useState<string | undefined>(
    preference.banner
  );

  const [bannerImage, setBannerImage] = useState<File | number | undefined>();
  const [logoImage, setLogoImage] = useState<File | number | undefined>();

  const closeModalHandler = () => {
    setModal({ ...modal, visibility: false });
  };

  const changeHandler = (
    type: 'banner' | 'logo',
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const image = e.target.files[0];

    type === 'banner' ? setBannerImage(image) : setLogoImage(image);

    type === 'banner'
      ? setPreBanner(URL.createObjectURL(image))
      : setPreLogo(URL.createObjectURL(image));
  };

  const saveHandler = async (type: 'banner' | 'logo') => {
    if (preference?.company_id === undefined) return;
    var result;
    if (type === 'logo' && logoImage !== undefined) {
      if (typeof logoImage === 'number') {
        result = await dispatch(
          updateCompanyProfile({ ...preference, logo: logoImage.toString() })
        );
      } else {
        result = await dispatch(
          updateCompanyLogo({
            data: logoImage,
            companyId: preference.company_id,
          })
        );
      }
      if (result.payload.success) {
        toast.custom(<Toast type="success" message="Successfully updated company logo!" />);
      }
      setModal({ ...modal, visibility: false });
      return;
    }

    if (typeof bannerImage === 'number') {
      result = await dispatch(
        updateCompanyProfile({ ...preference, banner: bannerImage.toString() })
      );
    } else if (bannerImage !== undefined) {
      result = await dispatch(
        updateCompanyBanner({
          data: bannerImage,
          companyId: preference.company_id,
        })
      );
    }
    if (result.payload.success) {
      toast.custom(<Toast type="success" message="Successfully updated company banner!" />);
    }
    setModal({ ...modal, visibility: false });
  };

  useEffect(() => {
    setPreBanner(preference.banner);
    setPreLogo(preference.logo);
    setLogoImage(undefined);
    setBannerImage(undefined);
  }, [modal.visibility]);

  return (
    <ModalV2
      onClose={() => setModal({ ...modal, visibility: false })}
      isOpen={modal.visibility}
    >
      {modal.type === 'LOGO' && (
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          className='overflow-x-hidden w-[490px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10'
        >
          <div className='w-full bg-white rounded-lg p-[66px_32px_26px_32px] flex flex-col relative'>
            <IconButtonV2
              className='absolute right-7 top-7'
              onClick={closeModalHandler}
              iconType='CLOSE'
              iconClassName='w-5 h-5'
            />
            <Heading
              variant='h6'
              className='font-semibold text-xl leading-[150%] text-center'
            >
              Change your company logo
            </Heading>
            <p className='mt-4 font-poppins text-sm leading-4 text-center'>
              Add a profile image or choose one of ours
            </p>
            <div
              className={`w-[108px] h-[108px] mt-4 mx-auto ${
                preLogo === undefined || preLogo === null ? 'bg-[#D9D9D9]' : ''
              } rounded-lg overflow-hidden`}
            >
              {preLogo && (
                <LogoWithDefaultV2
                  src={preLogo}
                  className='w-full h-full block'
                />
              )}
            </div>
            <label className='cursor-pointer h-10 flex gap-2 items-center p-[10px] text-sm leading-4 font-poppins rounded-lg border-[1px] border-odf w-fit mx-auto mt-4'>
              <IconV2 iconType='UPLOAD' iconClassName='w-5 h-5' />
              Upload image
              <input
                type='file'
                hidden
                name='company-logo'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  changeHandler('logo', e)
                }
              />
            </label>
            <p className='text-sm font-poppins w-fit mt-8 mx-auto'>
              Add a logo or choose one of ours
            </p>
            {/* Default Logos */}
            <div className='flex justify-center gap-3 mt-4'>
              {default_logos.map((logo, index) => (
                <img
                  key={'default logo' + index}
                  onClick={() => {
                    setPreLogo(logo);
                    setLogoImage(index);
                  }}
                  src={logo}
                  alt={'default logo-' + index}
                  width={70}
                  height={70}
                  className={`w-[70px] h-[70px] cursor-pointer transition-transform duration-150 ${
                    index === logoImage ? 'scale-125' : ''
                  }`}
                />
              ))}
            </div>

            <Button
              loading={is_busy}
              onClick={() => saveHandler('logo')}
              className='mt-[50px] w-[186px] mx-auto'
            >
              Save changes
            </Button>
          </div>
        </div>
      )}

      {modal.type === 'BANNER' && (
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          className='overflow-x-hidden w-[720px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10'
        >
          <div className='w-full p-[64px_56px_40px_56px] bg-white rounded-lg flex flex-col relative'>
            <IconButtonV2
              className='absolute right-7 top-7'
              onClick={closeModalHandler}
              iconType='CLOSE'
              iconClassName='w-5 h-5'
            />
            <Heading
              variant='h6'
              className='font-semibold text-xl leading-[150%] text-center'
            >
              Banner image
            </Heading>
            <div className='mt-9 w-full h-[136px] bg-[#D9D9D9] rounded-lg relative'>
              {preBanner && (
                <img
                  src={default_banners[preBanner]?.image ?? preBanner}
                  alt='company banner'
                  className='w-full h-full block object-cover rounded-lg'
                />
              )}
              <div className='absolute top-0 left-0 w-full h-full'>
                <p className='mt-11 text-center text-sm leading-4 font-poppins font-semibold'>
                  Upload a banner image
                </p>
                <label className='cursor-pointer flex items-center gap-3 px-6 w-fit mx-auto mt-5 h-10 rounded-lg bg-odf text-sm font-semibold font-poppins text-white'>
                  <IconV2 iconType='UPLOADWHITE' iconClassName='w-5 h-5' />
                  Upload image
                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      changeHandler('banner', e)
                    }
                    type='file'
                    id='banner_upload'
                    accept={'.png, .jpg, .jpeg'}
                    multiple={false}
                    hidden
                  />
                </label>
              </div>
            </div>
            <p className='font-poppins text-sm leading-4 mt-5 text-center'>
              Add a banner image or choose one of ours
            </p>
            <div className='mt-9 flex justify-center gap-3'>
              {default_banners.map((banner, index) => (
                <img
                  onClick={() => {
                    setPreBanner(default_banners[index].image);
                    setBannerImage(index);
                  }}
                  key={'default banner' + index}
                  src={banner.tile}
                  alt={'default banner' + index}
                  width={70}
                  height={70}
                  className='cursor-pointer rounded-md'
                />
              ))}
            </div>
            <Button
              loading={is_busy}
              onClick={() => saveHandler('banner')}
              className='mt-12 mx-auto w-[186px]'
            >
              Save changes
            </Button>
          </div>
        </div>
      )}
    </ModalV2>
  );
}
