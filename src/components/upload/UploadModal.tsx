import { useEffect, useState } from 'react';

import uploadSVG from 'assets/svg/upload.svg';
import UploadSVG from 'assets/svg/invert-upload.svg';
import closeSVG from 'assets/svg/close.svg';
import SinglePreshow from './SingleImagePreshow';
import MultiplePreshow from './MultiplePreshow';

interface ModalProps {
  title?: string;
  underlinedtext?: string;
  formats?: string;
  name: string;
  type: string;
  multiple?: boolean;
  setModal: Function;
}

export const TYPE_RESUME = 'resume';
export const TYPE_IMAGE = 'image';

const UploadModal = ({
  title = 'Upload your cover image',
  underlinedtext = 'Upload image',
  formats = '(jpg, pdf, png, jpeg)',
  name,
  type,
  multiple = true,
  setModal,
}: ModalProps) => {
  const [opened, setOpened] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<any>({});
  const [preview, setPreview] = useState<Array<string>>(['']);

  const accepts = {
    [TYPE_IMAGE]: '.png, .jpg, .jpeg',
    [TYPE_RESUME]: '.png, .jpg, .pdf',
  };

  const chooseHandler = () => {
    var data = {
      name,
      type,
      multiple: preview.length >= 2 ? true : false,
      urls: preview,
    };
    sessionStorage.removeItem(name);
    sessionStorage.setItem(name, JSON.stringify(data));
    setModal(false, selectedFiles);
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFiles) {
      setPreview([]);
      return;
    }

    var objectUrls: any = [];
    for (const key in selectedFiles) {
      if (Object.prototype.hasOwnProperty.call(selectedFiles, key)) {
        const element = selectedFiles[key];
        objectUrls.push(URL.createObjectURL(element));
      }
    }
    // const objectUrl = URL.createObjectURL(selectedFiles[0]);
    setPreview(objectUrls);

    // free memory when ever this component is unmounted
    return () => {
      for (let i = 0; i < objectUrls.length; i++) {
        URL.revokeObjectURL(objectUrls[i]);
      }
    };
  }, [selectedFiles]);

  const fileSelectHandler = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files;
    setSelectedFiles(file);
    setOpened(false);
  };

  return (
    <>
      <div
        onClick={() => setModal(false, undefined)}
        className='fixed top-0 left-0 w-screen h-screen bg-white/20 backdrop-blur-sm'
      />
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[557px] h-[454px] bg-[#2F3454] rounded-[15px] p-[18px] shadow-2xl'>
        <button
          className='ml-auto select-none block'
          onClick={() => setModal(false, undefined)}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z'
              fill='white'
            />
          </svg>
        </button>
        <h4 className='w-2/3 text-xl mt-10 text-white font-semibold text-center mx-auto'>
          {title}
        </h4>

        <div
          className={`mt-[28px] flex justify-center items-center ${
            !checkEmptyObj(selectedFiles) ? '' : 'hidden'
          }`}
        >
          {!checkEmptyObj(selectedFiles) && preview.length < 2 ? (
            <SinglePreshow url={preview[0]} />
          ) : (
            <MultiplePreshow urls={preview} />
          )}
        </div>

        <label
          className={`block pt-20 pb-16 h-[204px] ${
            !checkEmptyObj(selectedFiles) ? 'hidden' : ''
          }`}
        >
          <img
            src={uploadSVG}
            alt='upload'
            className='block mx-auto cursor-pointer'
            width={59}
            height={55}
          />
          <input
            onChange={fileSelectHandler}
            type='file'
            id='upload_input'
            accept={accepts[type]}
            multiple={multiple}
            hidden
          />
        </label>

        {/* Upload a file (jpg, pdf, png...) with option lists*/}
        <div
          className={`text-white text-[18px] font-semibold text-center cursor-pointer ${
            !checkEmptyObj(selectedFiles) ? 'hidden' : ''
          }`}
        >
          <span
            onClick={() => setOpened(!opened)}
            className='text-[14px] font-inter font-normal'
          >
            {/* <u>{underlinedtext}</u> {formats} */}
            <button className='flex items-center rounded-full bg-white text-black font-bold px-2 py-2 mx-auto text-sm'>
              <img src={UploadSVG} width='20px' className='mr-2' alt='upload' />
              {underlinedtext}
            </button>
          </span>
        </div>
        {opened ? (
          <ul
            id='file-upload-option'
            className='z-20 bg-white w-[282px] h-[58px] text-[14px] rounded-[10px] shadow-[0px_0px_10px_4px_#2E2E2E] mt-[10px] mx-auto flex flex-col justify-between'
          >
            <div
              className='w-screen h-screen fixed top-0 left-0 z-10'
              onClick={() => setOpened(false)}
            ></div>
            <label
              htmlFor='upload_input'
              className='pl-5 flex items-center h-full hover:shadow-[0px_0px_10px_8px_#2E2E2E] cursor-pointer p-3 hover:bg-primary transition-all duration-150 rounded-md z-50'
            >
              Choose file
            </label>
            {/* <li className='pl-5 flex items-center h-full hover:shadow-[0px_0px_10px_4px_#2E2E2E] p-3 cursor-pointer hover:bg-primary transition-all duration-150 rounded-md z-50'>
              Connect to google docs
            </li> */}
          </ul>
        ) : (
          <></>
        )}

        {
          /* Choose Button */
          !checkEmptyObj(selectedFiles) && !opened && (
            <div className='flex justify-center mt-8'>
              <button
                onClick={chooseHandler}
                className='py-[10px] px-10 text-base font-semibold text-black bg-white hover:bg-primary hover:text-white transition-all duration rounded-full'
              >
                Choose
              </button>
            </div>
          )
        }
      </div>
    </>
  );
};

const checkEmptyObj = (obj: any): boolean => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

export default UploadModal;
