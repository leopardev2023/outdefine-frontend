import { ReactElement } from 'react';

const ClientJobCard: React.FC = (): ReactElement => {
  return (
    <div className='w-[750px] h-[270px] border-[1px] border-primary pt-8 px-[60px] rounded-[15px] shadow-3xl relative'>
      <div className='w-full flex justify-between'>
        <div>
          <div className='flex gap-4'>
            <span className='w-9 h-9 bg-theme rounded-full' />
            <h5 className='font-poppins font-semibold'>
              Job Title
              <p className='font-medium text-sm'>Company name </p>
            </h5>
          </div>
          <div className='mt-4 flex gap-2'>
            <span className='w-[70px] h-[25px] bg-primary rounded-full' />
            <span className='w-[70px] h-[25px] bg-primary rounded-full' />
            <span className='w-[70px] h-[25px] bg-primary rounded-full' />
            <span className='w-[70px] h-[25px] bg-primary rounded-full' />
          </div>
          <p className='mt-6 font-poppins'>Overview</p>
          <span className='block text-xs mt-2 max-w-[517px]'>
            Lorem ipsum dolor sit amet. In porro harum ut iste quia in
            necessitatibus doloribus non voluptatem galisum corporis unde qui
            omnis
          </span>
        </div>

        <div className='pt-3 flex h-fit w-[130px] flex-wrap gap-y-4'>
          <span className='px-3 bg-primary rounded-full h-[25px] flex items-center text-xs'>
            Hybrid
          </span>
          <div className='w-full flex gap-2 flex-wrap'>
            <span className='px-3 bg-primary rounded-full h-[25px] flex items-center text-xs'>
              Full time
            </span>
            <span className='px-3 bg-primary rounded-full h-[25px] flex items-center text-xs'>
              PST
            </span>
          </div>
          <span className='px-3 bg-primary rounded-full h-[25px] flex items-center text-xs font-semibold font-poppins'>
            $50 -65 /hr
          </span>
        </div>
      </div>
      <div className='mt-5 flex justify-between items-center'>
        <div className='flex gap-[10px] items-center text-xs'>
          <span className='w-3 h-3 bg-primary rounded-full' />
          Active
        </div>
        <span className='text-xs font-poppins'>Posted on 8/1/22</span>
      </div>
    </div>
  );
};

export default ClientJobCard;
