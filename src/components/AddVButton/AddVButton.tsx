import AddIcon from 'assets/svg/add.svg';
import MinusIcon from 'assets/svg/minusV.svg';
import PlusIcon from 'assets/svg/plus.svg';

interface Props {
  remove?: boolean;
  label?: string;
  className?: string;
  onClick?: () => void;
}

const AddVButton: React.FC<Props> = ({
  label = '',
  className = '',
  onClick,
  remove = false,
}) => {
  return (
    <div onClick={onClick}  className={`flex items-center cursor-pointer ${className}`}>
      <div className='cursor-pointer'>
        {remove ? <img src={MinusIcon} /> : <img src={PlusIcon} />}
      </div>
      <label className='pl-2 cursor-pointer'>{label}</label>
    </div>
  );
};

export default AddVButton;
