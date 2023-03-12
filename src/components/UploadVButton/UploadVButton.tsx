import UploadIcon from 'assets/svg/upload1.svg';

interface Props {
  label?: any;
  className?: string;
  onClick?: any;
}

const UploadVButton: React.FC<Props> = ({ label = '', className = '', onClick = undefined }) => {
  return (
    <div
      className={`flex justify-center items-center bg-theme rounded-lg px-4 text-center min-w-max cursor-pointer ${className}`}
      onClick={onClick}
    >
      <img src={UploadIcon} alt='upload' />
      <label className='pl-2 text-sm w-fit'>{label}</label>
    </div>
  );
};

export default UploadVButton;
