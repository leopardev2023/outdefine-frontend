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

const JobInput: React.FC<IJobInput> = ({
  onAddJob,
  ...props
}: IJobInput): ReactElement => {
  const optionRef = useRef<HTMLDivElement>(null);
  const positions = props.data;

  const keydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key !== "Enter") {
      return;
    }
    e.preventDefault();
    if (suggestions.length > 0) {
      setFocus(false);
      onAddJob(suggestions[0].value);
      setValue("");
    }else{
      setFocus(false);
      onAddJob(value.toLowerCase());
      setValue("");
    }    
  };

  const [focus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>(
    typeof props.value === "string" ? props.value : "",
  );

  const suggestions = positions.filter((position) =>
    position.value.toLowerCase().includes(value.toLowerCase()),
  );

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    setFocus(true);
  };

  const selectHandler = (elem) => {
    onAddJob(elem.value);
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
        disabled={positions.length <= 0 || props.disabled}
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
                  key={elem.id + elem.value + index}
                  onClick={() => selectHandler(elem)}
                  className={`font-inter w-full pl-5 h-12 flex items-center capitalize cursor-pointer hover:bg-odf-light rounded-lg ${
                    suggestions.length > 0 && index === 0 ? "bg-odf-light" : ""
                  }`}
                >
                  {elem.value}
                </li>
              ))}
            </ul>
          </div>
        </Transition>
      )}
    </div>
  );
};
export default JobInput;
