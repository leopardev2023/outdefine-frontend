import { Transition } from "@headlessui/react";
import { Fragment, ReactElement, useEffect, useState } from "react";
import BadgeV2 from "../Badges/BadgeV2";
import IconV2 from "../Icons/IconV2";
import InputV2 from "../Input/InputV2";
import closeIcon from "./closeIcon.svg";

const SearchSelect = ({ data, onChange, placeholder, withBadge, badgeClass, className, defaultValue } : ISearchSelect) : ReactElement => {
  const [value, setValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const [searching, setSearching] = useState<boolean>(false);

  const changeHandler = (e) => {
    setValue(e.target.value);
    setSearching(true);
  };
  const onSelect = ({ value, id }) => {
    setSelectedValue(value);
    setValue(value);
    onChange && onChange(id);
    setSearching(false);
  };
  const onDelete = () => {
    setSelectedValue(undefined);
    setValue("");
    onChange && onChange(undefined);
    setSearching(false);
  };

  const suggestions : Array<IDataSearchSelect> = [];
  data.forEach(item => {
    if (item.value.toLowerCase().includes(value.toLowerCase())) suggestions.push(item);
  });

  // Border case, notify as a selection the defaultValue
  useEffect(() => {
    if (!defaultValue) return;

    // If the data does not contain the default id, ignore
    const found = data.find(d => d.id === defaultValue);
    if (!found) return;

    onSelect(found);
  }, [defaultValue]);

  return (

    <div className={`relative w-full ${className || ""}`} onBlur={() => setSearching(false)}>

        {/* --- Search Bar --- */}
        <div className="w-full relative">
            <img src={closeIcon}
            onClick={onDelete}
            className="absolute z-10 top-[15px] right-[20px] hover:cursor-pointer"/>
            <InputV2
                icon={
                <IconV2
                    iconClassName='w-5 h-5 translate-y-[1px]'
                    iconType={"SEARCH"}
                />
                }
                autoComplete='off'
                placeholder={placeholder || "Search..."}
                value={value}
                onChange={changeHandler}
                disabled={data.length <= 0}
            />
        </div>

        {/* --- Selection --- */}
        {suggestions.length > 0 && (
        <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
        show={searching}
        >
        <div className='absolute w-full top-14 text-xs shadow-xl rounded-lg overflow-hidden z-10 p-[12px_4px_12px_8px] bg-white'>
            <ul className='w-full max-h-[200px] overflow-auto pr-1'>
            {suggestions.map((item) => (
                <li
                onClick={() => onSelect(item)}
                key={item.id}
                className={`font-inter w-full pl-5 h-12 flex items-center cursor-pointer hover:bg-odf-light rounded-lg ${
                    suggestions.length === 1 ? "bg-odf-light" : ""
                }`}
                >
                {item.value}
                </li>
            ))}
            </ul>
        </div>
        </Transition>
        )}

        {/* --- Optional Badge */}
        {withBadge && selectedValue && (
            <BadgeV2 addClass={badgeClass || "mt-[15px]"}>
                {selectedValue}
            </BadgeV2>
        )}
    </div>

  );
};

export default SearchSelect;
