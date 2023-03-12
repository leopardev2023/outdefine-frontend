import { useEffect, useState } from 'react';
import { isEmpty } from '@aws-amplify/core';

export const TYPE_RESUME = 'resume';
export const TYPE_IMAGE = 'image';

interface ModalProps {
  formats?: string;
  multiple?: boolean;
  showModal?: boolean;
  setShowModal: Function;
  setModal: Function;
}

const UploadImage = ({
  multiple = true,
  setShowModal,
  setModal,
}: ModalProps) => {
  const [selectedFiles, setSelectedFiles] = useState<any>({});

  const accepts = {
    [TYPE_IMAGE]: '.png, .jpg, .jpeg',
    [TYPE_RESUME]: '.png, .jpg, .pdf',
  };

  const chooseHandler = () => {
    if (isEmpty(selectedFiles)) {
      return;
    }
    setModal(false, selectedFiles);
    setShowModal(false);
  };

  useEffect(() => {
    chooseHandler();
  }, [selectedFiles]);

  const fileSelectHandler = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files;
    setSelectedFiles(file);
  };

  return (
    <>
      <div
        className='w-screen h-screen fixed top-0 left-0 z-10'
        onClick={() => setShowModal(false)}
      ></div>
      <ul
        id='file-upload-option'
        className='shadow-md bg-white w-[183px] h-[112px] text-[14px] rounded-[10px] mt-[10px] flex flex-col justify-between absolute left-1/2 -translate-x-1/2 bottom-[-116px] px-2 py-8 z-10'
      >
        <label
          htmlFor='upload_input'
          className='font-inter text-sm pl-5 flex items-center h-full cursor-pointer p-3 hover:bg-[#D2D6ED] transition-all duration-150 rounded-md z-50'
        >
          Choose file
        </label>
        <input
          onChange={fileSelectHandler}
          type='file'
          id='upload_input'
          accept={accepts['image']}
          multiple={multiple}
          hidden
        />
      </ul>
    </>
  );
};

export default UploadImage;
