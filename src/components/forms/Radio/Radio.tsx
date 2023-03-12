interface Props {
  label?: string;
  name?: string;
  checked?: boolean;
  className?: string;
  onChange?: () => void;
  onClick?: () => void;
  readonly?: boolean
}

const Checkbox: React.FC<Props> = ({
  label = '',
  name = '',
  checked = false,
  className = '',
  onChange,
  onClick,
  readonly = false,
}) => {
  return (
    <>
      <div className={'flex justify-center items-center w-fit ' + className}>
        <input
          type='radio'
          name={name}
          checked={checked}
          className='bg-white cursor-pointer w-4 h-4 checked:bg-none border-none rounded-full checked:hover:!bg-secondary checked:!bg-secondary focus-visible:!bg-secondary shadow-3xl hover:bg-white '
          onChange={onChange}
          onClick={onClick}
          readOnly={readonly}
        />
        <label className='ml-2 leading-4'>{label}</label>
      </div>
    </>
  );
};

export default Checkbox;
