interface PropsType {
    children: React.ReactNode;
    onClick: (index: number) => void;
    index: number;
  }
  
export const EmailItem: React.FC<PropsType> = ({
    children = '',
    onClick,
    index = 0
  }) => {
    return (
      <div className='o-flex bg-theme text-white rounded-full pl-3 pr-1 py-2 h-[25px] mr-1 mb-1'>
        {children}
        <div
          className='o-flex rounded-full w-3 h-3 bg-white text-theme text-center ml-3 cursor-pointer'
          onClick={() => onClick(index)}
        >
          <div className='w-[6px] h-[1px] bg-theme'></div>
        </div>
      </div>
    );
  };