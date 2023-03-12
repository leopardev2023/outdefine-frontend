import React, { ReactElement, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import MarkDown from "./MarkDown";
import IconV2 from "../Icons";
import { Controller } from "react-hook-form";
import BadgeV2 from "../Badges/BadgeV2";

interface IMultiSelectDropdownV2 extends IMultiDropdownV2 {
  name: string;
  control: any;
  rules?: Record<string, any>;
  onChange: Function;
  selectedData: Array<any>;
  withBadge?: boolean;
  minusInBadge: boolean;
  staredBadge?: boolean;
  badgeColor?: string;
  maxLength?: number;
}

export const FormMultiSelectDropdownV2 = ({
  name,
  control,
  rules = {},
  selectedData,
  onChange,
  minusInBadge = false,
  withBadge = false,
  staredBadge = false,
  badgeColor = undefined,
  maxLength,
  ...props
}: IMultiSelectDropdownV2) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={[]}
      render={({ field: { value, onChange } }) => (
        <>
          <MultiSelectDropdownV2
            {...props}
            selectedData={value}
            onChange={(e) => {
              if (maxLength && e.length > maxLength) return;
              onChange(e);
            }}
          />
          {withBadge && value && value.length > 0 && (
            <div className='flex justify-start gap-x-2 flex-wrap gap-2'>
              {value.map((elem, index) => (
                <BadgeV2
                  color={badgeColor as any}
                  starInBadge={staredBadge}
                  addClass='h-6 font-inter font-normal'
                  minusInBadge={minusInBadge}
                  key={index}
                >
                  {elem.value ?? ""}
                </BadgeV2>
              ))}
            </div>
          )}
        </>
      )}
    />
  );
};

const MultiSelectDropdownV2 = (props: IMultiDropdownV2): ReactElement => {
  const [staticOptions, setStaticOptions] = useState<Array<IData>>(
    props.selectedData,
  );

  const clickHandler = (elem: IData) => {
    const does_exist =
      props.selectedData.find((_elem) => elem.index === _elem.index) !==
      undefined;
    const new_options = does_exist
      ? props.selectedData.filter((_elem) => elem.index !== _elem.index)
      : [...props.selectedData, elem];
    props.onChange(new_options);
  };

  return (
    <Listbox value={staticOptions} onChange={setStaticOptions} multiple>
      {({ open }) => (
        <div className={`relative ${open ? "z-10" : ""}`}>
          <Listbox.Button
            className={`px-4 ${
              open ? "border-odf" : "border-dark-gray"
            } truncate border-[1px] rounded-lg ${
              props.buttonClassName
                ? props.buttonClassName
                : "w-full min-w-[80px] h-8 text-xs"
            } ${
              props.filterDropdown && open && "bg-[#D2D6ED]"
            } flex items-center justify-between`}
          >
            <div className='flex items-center gap-2'>
              {props?.icon}
              {props.buttonText ??
                props.selectedData.map((elem) => elem.value).join(", ")}
            </div>
            {props.filterDropdown
              ? (
              <IconV2
                iconType='TRIANGLE-ARROW-SOLID'
                iconClassName={`${
                  open ? "" : "rotate-180"
                } transition-all duration-150`}
              />
                )
              : (
              <MarkDown open={open} />
                )}
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options
              static
              className={`absolute bg-white translate-y-2 ${
                props.listClassName
                  ? props.listClassName
                  : "w-full text-xs font-inter"
              } ${
                props.directionUp ? "bottom-[60px]" : ""
              } right-0 rounded-lg shadow-3xl pt-8 pl-7 pr-5 flex flex-col`}
            >
              <div className='max-h-[500px] overflow-auto pr-2'>
                {props.listData.map((elem) => (
                  <Listbox.Option
                    onClick={() => clickHandler(elem)}
                    key={elem.index}
                    value={elem}
                    className='first:mt-0 mt-6 cursor-pointer flex items-center gap-4 text-sm font-inter'
                  >
                    <div
                      className={`min-w-[20px] min-h-[20px] w-5 h-5 rounded-[2px] border-[1px] border-odf flex items-center justify-center ${
                        props.selectedData.find(
                          (option) => option.index === elem.index,
                        )
                          ? "bg-odf"
                          : ""
                      }`}
                    >
                      {props.selectedData.find(
                        (option) => option.index === elem.index,
                      ) && <WhiteMarkSvg />}
                    </div>
                    {elem.value}
                  </Listbox.Option>
                ))}
              </div>
              <button
                onClick={() => {
                  props.onChange([]);
                }}
                className='font-inter ml-auto w-fit mt-1 mb-3 right-5 text-[#8A8A8A] font-semibold text-xs'
              >
                Reset
              </button>
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

function WhiteMarkSvg() {
  return (
    <svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        y='7.02051'
        width='1'
        height='6.05742'
        rx='0.5'
        transform='rotate(-41.0801 0 7.02051)'
        fill='white'
      />
      <rect
        x='10.8086'
        width='1'
        height='13.2031'
        rx='0.5'
        transform='rotate(34.2087 10.8086 0)'
        fill='white'
      />
    </svg>
  );
}

export default MultiSelectDropdownV2;
