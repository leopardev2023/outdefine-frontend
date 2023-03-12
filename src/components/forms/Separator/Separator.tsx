const Separator:React.FC = () => {
  return (
    <>
      <div className='flex w-full justify-center items-center my-[15px]'>
        <div className='h-[2px] bg-primary w-full rounded-full' />
        <span className='mx-5'>or</span>
        <div className='h-[2px] bg-primary w-full rounded-full' />
      </div>
    </>
  )
}

export default Separator;
