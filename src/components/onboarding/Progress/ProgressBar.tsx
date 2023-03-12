interface PropsType {
  ongoing?: boolean;
}

const ProgressBar: React.FC<PropsType> = ({ ongoing = false }) => {
  const background = ongoing ? "bg-odf" : "bg-odf-light";
  return (
    <>
      <div className={`w-[40px] md:w-[134px] h-[6px] md:h-[8px] ${background}`}></div>
    </>
  );
};

export default ProgressBar;
