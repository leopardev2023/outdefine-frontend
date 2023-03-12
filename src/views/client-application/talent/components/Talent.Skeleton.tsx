import Skeleton from 'react-loading-skeleton';

const TalentSkeleton = () => {
  return (
    <div className='w-full flex flex-col gap-y-10'>
      {Array(5)
        .fill(0)
        .map((_, index: number) => (
          <div
            className='w-full rounded-[15px] bg-white pt-5 pb-4 px-4 flex justify-between'
            key={index}
          >
            <div className='w-20'>
              <Skeleton circle className='w-16 h-16' />
            </div>
            <div className='w-full'>
              <Skeleton className='w-40' />
              <Skeleton className='w-20' />
              <Skeleton className='w-1/2 h-8' />
              <Skeleton className='h-16' />
            </div>
          </div>
        ))}
    </div>
  );
};

export default TalentSkeleton;
