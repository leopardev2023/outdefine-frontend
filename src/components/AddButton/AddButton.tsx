import AddIcon from "assets/svg/add.svg";
import MinusIcon from "assets/svg/minus.svg";

interface Props {
  remove?: boolean;
  label?: string;
  className?: string;
  onClick?: () => void;
}

const AddButton: React.FC<Props> = ({ label = "", className = "", onClick, remove = false }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div onClick={onClick} className="cursor-pointer">
        {remove ? <img src={MinusIcon} /> : <img src={AddIcon} />}
      </div>
      <label className="pl-2">{label}</label>
    </div>
  );
};

export default AddButton;
