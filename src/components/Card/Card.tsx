interface PropTypes {
  children?: any;
  className?: string;
}

const Card: React.FC<PropTypes> = ({ className, children }) => {
  return (
    <>
      <div
        className={`flex flex-col w-[350px] md:w-[400px] bg-white items-center rounded-[15px] shadow-xl ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default Card;
