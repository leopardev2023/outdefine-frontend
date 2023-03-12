const LightBlueButton = ({ icon, isActive, onClick, children }: ILightBlueButton) => {
  const strClassName =
    "w-[38px] h-5 rounded-full flex items-center px-[2px] transition-all duration-150";
  // strClassName += disabled ? " bg-lighter-black" : " hover:bg-lighter-black";
  // strClassName += status ? " bg-black" : " bg-darker-gray";

  const onClickHandler = () => {
    if (!onClick) return;
    onClick();
  };

  return (
    <div
      className={`flex rounded-[8px] text-sm font-inter px-4 py-3 items-center mb-[14px] cursor-pointer shadow-md	 ${
        isActive ? "bg-odf-light !border-theme " : "bg-white"
      }`}
      onClick={onClickHandler}
    >
      {icon}
      <span data-cy="category-name" className="pl-2 pr-1">{children}</span>
    </div>

    // <div
    //   onClick={onClickHandler}
    //   // className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"} flex items-center gap-2`}
    // >
    //   <div className={strClassName}>
    //     <span
    //       className={`block w-4 h-4 ${
    //         status ? "ml-[18px]" : "ml-0"
    //       } rounded-full bg-background transition-all duration-150`}
    //     />
    //   </div>
    //   {children}
    // </div>
  );
};

export default LightBlueButton;
