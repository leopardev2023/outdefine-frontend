import { SkillFullType } from 'redux/slices/prototype';

const SkillItem = ({ skill, index }: ItemType) => {
  return (
    <div
      key={'skill' + index}
      className='h-[30px] px-3 flex gap-2 items-center bg-theme text-white font-semibold text-xs rounded-full'
    >
      {skill.name}
      <span className='w-4 h-4 bg-white rounded-full text-theme flex items-center justify-center font-bold'>
        <span className='w-[6px] h-[1px] bg-theme block' />
      </span>
    </div>
  );
};

interface ItemType {
  skill: SkillFullType;
  index: number;
}

export default SkillItem;
