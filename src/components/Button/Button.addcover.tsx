import AddButton from 'components/AddButton';

interface PropsType {
  onClick: () => void;
  coverPhoto: string;
}

const AddCoverButton: React.FC<PropsType> = ({
  onClick = undefined,
  coverPhoto = '',
}) => {
  return (
    <div className='w-fit h-[70px] flex flex-row gap-x-8 justify-center'>
      <div
        className={`w-[114px] h-[70px] flex justify-center items-center cursor-pointer shadow-3xl rounded-md`}
        onClick={onClick}
      >
        {coverPhoto ? (
          <img src={coverPhoto} className='w-[114px] !h-[70px]' />
        ) : (
          <AddButton />
        )}
      </div>
      <div className='o-flex font-inter font-semibold'>Add a cover photo</div>
    </div>
  );
};

export default AddCoverButton;
