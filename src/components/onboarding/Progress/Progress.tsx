import ProgressBar from "./ProgressBar";

interface PropsType {
  step?: number;
  count?: number;
  className?: string;
}

const Progress: React.FC<PropsType> = ({ step = 1, count = 6, className = "" }) => {
  return (
    <>
      <div className={`flex flex-row justify-center gap-x-6 px-2 ${className}`}>
        {Array(count)
          .fill(0)
          .map((val: any, index: number) => (
            <ProgressBar key={index} ongoing={index + 1 <= step} />
          ))}
      </div>
    </>
  );
};

export default Progress;
