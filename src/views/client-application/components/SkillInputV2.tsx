import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { Transition } from "@headlessui/react";

import {
  KeyboardEvent,
  ChangeEvent,
  ReactElement,
  useState,
  Fragment,
  useRef,
  useEffect,
} from "react";

import InputV2 from "components/V2/Input/InputV2";
import { Controller } from "react-hook-form";
import LabelWrapperV2 from "views/application/profile/componentsV2/Wrapper.LabelV2";

interface IFormSkillInputV2 {
  name: string;
  control: any;
  skillData: Array<any>;
  chosenData: Array<any>;
  isPrimary: boolean;
  labelText?: string;
  rules: Record<string, any>;
}

export const FormSkillInputV2 = ({
  name,
  control,
  skillData,
  labelText,
  rules = {},
  isPrimary = true,
}: IFormSkillInputV2) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={[]}
      render={({ field: { onChange, value } }) => (
        <BadgeSkillInputV2
          isPrimary={isPrimary}
          skillData={skillData}
          labelText={labelText}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

export const BadgeSkillInputV2 = ({
  value,
  onChange,
  skillData,
  labelText = "",
  isPrimary,
}) => {
  const [skills, setSkills] = useState<any>(value);
  const allSkills = useSelector((root: RootState) => root.prototype.skills);
  const handleAddSkill = (idx: number) => {
    if (skills?.length >= 5 || skills.includes(idx)) return;
    const newSkillSet = Array.from(new Set(skills).add(idx));
    setSkills(newSkillSet);
    onChange(newSkillSet);
  };
  const handleRemoveSkill = (skillStr: string) => {
    const idToRemove = allSkills.find((skill) => skill.name === skillStr)?.id;
    const newSkillSet = skills.filter((idx: number) => idx !== idToRemove);
    setSkills(newSkillSet);
    onChange(newSkillSet);
  };

  // If not label provided use default texts
  const label = labelText || (isPrimary ? "Primary skills (multi-select)" : "Secondary skills (multi-select)");

  return (
    <LabelWrapperV2
      starInBadge={isPrimary}
      smallBadge
      minusInBadge
      badgeColor={isPrimary ? "pink" : "blue"}
      badgeTexts={skills.map(
        (skillId: number) =>
          allSkills.find((skill) => skill.id === skillId)?.name || "?",
      )}
      label={label}
      onBadgeClick={handleRemoveSkill}
    >
      <SkillInputV2
        skillData={skillData}
        placeholder='Type in a skill (multi-select)'
        onAddSkill={(idx: number) => handleAddSkill(idx)}
      />
    </LabelWrapperV2>
  );
};

const SkillInputV2: React.FC<ISkillInputV2> = ({
  onAddSkill,
  ...props
}: ISkillInputV2): ReactElement => {
  const optionRef = useRef<HTMLDivElement>(null);
  const skills = props.skillData || useSelector((root: RootState) => root.prototype.skills);

  const keydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key !== "Enter") {
      return;
    }
    e.preventDefault();
    if (suggestions.length > 0) {
      setFocus(false);
      onAddSkill(suggestions[0].id);
      setValue("");
    }else{
      setFocus(false);
      onAddSkill(value.toLowerCase());
      setValue("");
    }    
  };

  const [focus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>(
    typeof props.value === "string" ? props.value : "",
  );

  const suggestions = skills.filter((skill) =>
    skill.name.toLowerCase().includes(value.toLowerCase()),
  );

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(value);
    setFocus(true);
  };

  const selectSkillHandler = (elem) => {
    onAddSkill(elem.id);
    setValue("");
    setFocus(false);
  };

  function handleClickOutside(event) {
    if (optionRef.current && !optionRef.current.contains(event.target)) {
      setFocus(false);
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionRef]);

  useEffect(() => {}, [focus]);

  return (
    <div className='relative'>
      <InputV2
        {...props}
        autoComplete='off'
        value={value}
        onChange={changeHandler}
        onFocus={() => setFocus(true)}
        onKeyDown={keydownHandler}
        disabled={skills.length <= 0 || props.disabled}
      />
      {suggestions.length > 0 && (
        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
          show={focus}
        >
          <div
            ref={optionRef}
            onClick={handleClickOutside}
            className={`absolute w-full text-xs shadow-xl rounded-lg overflow-hidden z-10 p-[12px_4px_12px_8px] bg-white ${
              props.directionUp ? "bottom-14" : "top-14"
            }`}
          >
            <ul className='w-full max-h-[200px] overflow-auto pr-1'>
              {suggestions.map((elem, index) => (
                <li
                  key={elem.id + elem.name + index}
                  onClick={() => selectSkillHandler(elem)}
                  className={`font-inter w-full pl-5 h-12 flex items-center capitalize cursor-pointer hover:bg-odf-light rounded-lg ${
                    suggestions.length > 0 && index === 0 ? "bg-odf-light" : ""
                  }`}
                >
                  {elem.name}
                </li>
              ))}
            </ul>
          </div>
        </Transition>
      )}
    </div>
  );
};
export default SkillInputV2;
