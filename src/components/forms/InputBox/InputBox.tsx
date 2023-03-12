interface InputBoxProps {
  name?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  onClick?: () => void;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}

const InputBox: React.FC<InputBoxProps> = ({
  name = '',
  type = 'text',
  placeholder = '',
  className = '',
  required = false,
  value = '',
  onClick = undefined,
  onChange = undefined,
  onBlur = undefined,
  disabled = false,
}) => {
  return (
    <>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full h-[46px] flex justify-between items-center px-3 border-dark-gray rounded-[8px] ${className}`}
        required={required}
        value={value}
        onClick={onClick}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    </>
  );
};

export default InputBox;
