import IconV2 from 'components/V2/Icons/IconV2';

interface IGroupText {
  name: string;
  role: string;
  boosted?: boolean;
}
const NameRoleLocation = ({ name, role, boosted }: IGroupText) => {
  return (
    <div className='font-poppins font-semibold text-base'>
      <p className='flex items-center gap-2'>
        {role}
        {boosted && (
          <IconV2 iconType={'TOKEN'} iconClassName='w-[17px] h-[17px]' />
        )}
      </p>
      <span className='font-inter font-medium text-sm'>{name}</span>
    </div>
  );
};

export default NameRoleLocation;
