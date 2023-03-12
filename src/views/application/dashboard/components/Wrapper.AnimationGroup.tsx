const AnimationGroupWrapper = ({ data }: { data: Array<any> }) => {
  return (
    <div className='mt-[96px] md:pb-[100px] flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-4 gap-y-6'>
      {data.map((card, index) => (
        <div key={index} >
          {card}
        </div>
      ))}
    </div>
  );
};

export default AnimationGroupWrapper;
