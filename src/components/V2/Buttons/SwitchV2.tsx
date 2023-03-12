const SwitchV2 = ({ children, disabled, status, onClick }: ISwitchV2) => {
  var strClassName =
    'w-[38px] h-5 rounded-full flex items-center px-[2px] transition-all duration-150';
  strClassName += disabled ? ' bg-lighter-black' : ' hover:bg-lighter-black';
  strClassName += status ? ' bg-black' : ' bg-darker-gray';

  const toggleHandler = () => {
    if (disabled || !onClick) return;
    onClick();
  };

  return (
    <div
      onClick={toggleHandler}
      className={`${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      } flex items-center gap-2`}
    >
      <div className={strClassName}>
        <span
          className={`block w-4 h-4 ${
            status ? 'ml-[18px]' : 'ml-0'
          } rounded-full bg-background transition-all duration-150`}
        />
      </div>
      {children}
    </div>
  );
};

export default SwitchV2;
