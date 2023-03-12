import UploadIcon from 'assets/svg/upload2.svg';

interface Props {
  label?: any;
  className?: string;
  onClick?: any;
}

const UploadButton: React.FC<Props> = ({
  label = '',
  className = '',
  onClick = undefined,
}) => {
  return (
    <div
      className={`flex items-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      <img src={UploadIcon} />
      <label className='pl-2'>{label}</label>
    </div>
  );
};

export default UploadButton;
