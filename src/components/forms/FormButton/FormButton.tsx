interface InputProps {
  name?: string;
  text?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  icon?: JSX.Element;
  className?: string;
  onClick?: (e: any) => void;
}

const FormButton: React.FC<InputProps> = ({
  name = '',
  type = 'button',
  text = '',
  icon = null,
  className = '',
  onClick,
}) => {
  return (
    <>
      <button
        name={name}
        type={type}
        onClick={onClick}
        className={`w-full h-[46px] bg-white flex justify-between items-center px-5 shadow-3xl rounded-[15px] ${className}`}
      >
        <span>{text}</span>
        {icon}
      </button>
    </>
  );
};

export default FormButton;
