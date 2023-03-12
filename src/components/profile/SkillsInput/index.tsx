import { RootState } from 'app/store';
import { skillsInput } from 'helpers/profile';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SkillFullType } from 'redux/slices/prototype';

import SkillItem from './SkillItem';

const SkillsInput = (props: PropsType) => {
  const skills = useSelector((state: RootState) => state.prototype.skills);
  const [newone, setNewone] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(false);

  const keydownHandler = (e: any) => {
    if (e.key === 'Backspace') {
      if (newone) return;
      removeHandler(props.skills.length - 1);
      return;
    }
    if (e.key !== 'Enter') return;
    const skillID = skillsInput.validateSkills(skills, newone);
    if (skillID === undefined) return;
    var _skills = [...props.skills, { id: skillID, name: newone }];
    setNewone('');
    props.onChange(_skills);
  };

  const removeHandler = (index: number) => {
    var _skills = [
      ...props.skills.slice(0, index),
      ...props.skills.slice(index, props.skills.length - 1),
    ];
    props.onChange(_skills);
  };

  return (
    <div
      onClick={() => setFocus(true)}
      className={`top-0 left-0 overflow-y-auto flex flex-wrap gap-2 shadow-3xl rounded-[15px] w-[630px] h-[80px] p-3 bg-white ${
        props.addClass ?? ''
      }`}
    >
      {props.skills.map((skill, index) => (
        <div
          key={'skill' + index}
          onClick={() => removeHandler(index)}
          className='cursor-pointer'
        >
          <SkillItem index={index} skill={skill} />
        </div>
      ))}
      {focus && (
        <div className='relative max-w-20 h-7'>
          <input
            onKeyDown={keydownHandler}
            onChange={(e) => setNewone(e.target.value)}
            value={newone}
            className='shadow-md h-full pr-8'
            placeholder='Add one'
            autoFocus={focus}
          />
          <span className='absolute w-5 h-5 bg-theme text-white flex justify-center items-center rounded-full right-3 top-1/2 -translate-y-1/2'>
            <span className=''>+</span>
          </span>
        </div>
      )}
    </div>
  );
};

interface PropsType {
  skills: Array<SkillFullType>;
  addClass?: string;
  onChange: any;
}

export default SkillsInput;
