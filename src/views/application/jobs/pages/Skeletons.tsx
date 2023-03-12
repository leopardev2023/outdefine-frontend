import Skeleton from 'react-loading-skeleton';

export function JobDetailPageSkeleton() {
  return (
    <main className='flex flex-col pb-[66px]'>
      <div className='relative mt-14'>
        <Skeleton className='w-full h-[220px] rounded-lg' />
        <Skeleton
          circle
          className='absolute z-10 left-1/2 -translate-x-1/2 -bottom-[36px] w-[122px] h-[122px] bg-white rounded-full p-2'
        />
      </div>

      <div className='mt-[42px] flex flex-col items-center'>
        <Skeleton className='w-[200px] h-6' />
        <Skeleton className='w-[150px] h-6 mt-2' />
        <Skeleton className='w-[360px] h-5 mt-4' />
      </div>

      <div className='mt-4 relative w-fit mx-auto flex gap-8'>
        <Skeleton className='w-[180px] h-10' />
        <Skeleton className='w-[180px] h-10' />
      </div>

      <div className='mx-auto mt-10 flex flex-col'>
        <div className='h-[52px] w-[540px] mx-auto'>
          <Skeleton className='w-full h-full' />
        </div>

        <div className='mt-12 flex gap-5'>
          {new Array(6).fill(true).map((_item, index) => (
            <Skeleton key={'skel' + index} className='w-[130px] h-[130px]' />
          ))}
        </div>
        <Skeleton className='mt-11 w-full h-[500px]' />
      </div>
    </main>
  );
}
