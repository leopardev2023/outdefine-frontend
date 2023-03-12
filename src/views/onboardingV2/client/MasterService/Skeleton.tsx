import Skeleton from 'react-loading-skeleton';

const LoadingSkeleton = () => {
  return (
    <>
      <Skeleton width={200} />
      <Skeleton width={100} />
      <Skeleton className='w-full' count={3} />
      <Skeleton width={100} />
      <Skeleton className='w-full' count={3} />
      <Skeleton className='w-full' count={3} />
      <Skeleton className='w-full' count={2} />
    </>
  );
};

export default LoadingSkeleton;
