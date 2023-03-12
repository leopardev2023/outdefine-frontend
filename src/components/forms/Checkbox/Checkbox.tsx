interface PropsType {
  name?: string;
  label?: string;
  checked?: boolean;
  className?: string;
  onChange?: (e: any) => void;
}

const Checkbox: React.FC<PropsType> = ({
  label = '',
  name = '',
  className = '',
  checked = false,
  onChange = undefined,
}) => {
  return (
    <>
      <div className={'flex items-center justify-center ' + className}>
        <input
          type='checkbox'
          name={name}
          checked={checked}
          onChange={onChange}
          className='bg-white cursor-pointer w-5 h-5 border-none rounded-full shadow-3xl'
        />
        <label className='ml-2 leading-4 cursor-pointer' onClick={onChange}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Checkbox;
