import { useState } from 'react';

const CodePanel = ({ className, children }: any) => {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <pre
      className={`rounded-lg ${className} ${
        expand
          ? 'z-10 fixed top-0 right-0 w-screen h-screen !max-h-screen bg-white flex justify-center pt-20 mt-0'
          : 'relative pl-6 pr-32 w-fit bg-white shadow-3xl overflow-auto h-fit'
      } `}
    >
      {children}
      <span
        onClick={() => setExpand(!expand)}
        className={`cursor-pointer py-1 px-3 rounded-full text-sm bg-theme/50 ${
          expand ? 'fixed top-10 right-10 ' : ' absolute top-4 right-2 '
        }`}
      >
        {expand ? 'Back' : 'Expand'}
      </span>
    </pre>
  );
};

export default CodePanel;
