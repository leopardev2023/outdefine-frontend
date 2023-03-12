import { useState } from 'react';
import UploadImage from './UploadImage';
import UploadVButton from 'components/UploadVButton';

type UploadPanelProps = {
  background?: string;
  className?: string;
  sampleAvatar?: string;
  handleUpload: (val: boolean, selectedFiles: any) => void;
};

export const UploadPanel = ({
  handleUpload,
  background = '',
  sampleAvatar = '',
  className,
}: UploadPanelProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div
      style={{
        backgroundImage: background ? `url("${background}")` : undefined,
      }}
      className={`relative w-[215px] h-[215px] bg-cover bg-[#D9D9D9] rounded-[4px] ${
        className ?? ''
      }`}
    >
      {sampleAvatar ? (
        <img src={sampleAvatar} className='w-full h-full' alt='avatar' />
      ) : null}
      <UploadVButton
        label={
          <span className='cursor-pointer'>
            <span className='font-semibold text-white font-poppins text-sm'>{`Upload image`}</span>
          </span>
        }
        className='absolute left-1/2 h-10 -translate-x-1/2 bottom-4'
        onClick={() => setShowModal(!showModal)}
      />
      {showModal && (
        <UploadImage
          showModal={showModal}
          multiple={false}
          setShowModal={(val: boolean) => setShowModal(val)}
          setModal={handleUpload}
        />
      )}
    </div>
  );
};

export default UploadPanel;
