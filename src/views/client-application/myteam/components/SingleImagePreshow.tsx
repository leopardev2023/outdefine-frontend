interface PropsType {
  url: string;
}
const SinglePreshow = ({ url }: PropsType) => {
  return (
    <div>
      <img
        src={url}
        width={158}
        height={148}
        alt='selected'
        className='rounded-[15px] w-[158px] h-[148px]'
      />
      <label
        htmlFor='upload_input'
        className='cursor-pointer block w-full text-center text-white text-base font-semibold mt-[14px] underline underline-offset-4'
      >
        Change Image
      </label>
    </div>
  );
};
export default SinglePreshow;
