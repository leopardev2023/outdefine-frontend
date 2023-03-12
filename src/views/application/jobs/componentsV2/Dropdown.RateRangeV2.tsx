import { Popover, Transition } from "@headlessui/react";
import { AppDispatch, RootState } from "app/store";
import IconButtonV2 from "components/V2/IconButton";
import IconV2 from "components/V2/Icons";
import { ChangeEvent, Fragment, ReactElement, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilterQuery, setRateInFilterQuery } from "redux/slices/jobs";

export default function RateRangeDropdownV2({ ...props }: IRateRangeDropdown): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const query: JobFilterType = useSelector((root: RootState) => root.job.query);
  const { hourly_max_rate, hourly_min_rate } = query;

  const changeHandler = (name: "hourly_min_rate" | "hourly_max_rate", value: number | string) => {
    const rateValue = isNaN(Number(value))
      ? name === "hourly_max_rate"
        ? hourly_min_rate + 1
        : 0
      : Number(value);
    dispatch(setFilterQuery({ name, value: rateValue }));
  };

  const resetHandler = () => {
    dispatch(setRateInFilterQuery({ min: 0, max: 200 }));
  };

  return (
    <Popover className="relative">
      {({ open }) => {
        return (
          <>
            <Popover.Button
              className={`${props.buttonClassName ?? "h-8"} ${
                open ? "border-odf" : "border-dark-gray"
              } flex items-center gap-2 px-4 font-inter text-xs  border-[1px] rounded-lg`}
            >
              {props.buttonText}
              <IconV2
                iconType="TRIANGLE-ARROW-SOLID"
                iconClassName={`${open ? "" : "rotate-180"} transition-all duration-180`}
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className={`absolute bg-white translate-y-2 z-[2] ${
                  props.popupClassName ? props.popupClassName : "w-full"
                } ${
                  props.directionUp ? "bottom-[60px]" : ""
                } max-md:left-1/2 max-md:-translate-x-1/2 md:right-0 rounded-lg shadow-3xl pt-8 pl-7 pr-5 flex flex-col`}
              >
                <p className="font-poppin text-xs leading-4">Set a range</p>
                <div className="mt-5 flex gap-10">
                  <div className="w-full">
                    <span className="mb-2 block font-inter font-semibold text-xs leading-4 text-dark-gray">
                      Minimum
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex border-b border-b-dark-gray w-20 pb-[6px]">
                        <span className="font-inter text-xs leading-4 text-dark-gray">$</span>
                        <input
                          name="min"
                          value={hourly_min_rate}
                          placeholder="0"
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            changeHandler("hourly_min_rate", e.target.value)
                          }
                          className="border-none h-4 w-14 py-0 px-1 rounded-none shadow-none"
                        />
                        <span className="font-inter text-xs leading-4">/hr</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <IconButtonV2
                          onClick={() =>
                            changeHandler(
                              "hourly_min_rate",
                              Math.min(Number(hourly_min_rate) + 1, Number(hourly_max_rate) - 1),
                            )
                          }
                          iconType="TRIANGLE-ARROW-SOLID"
                          className="p-0"
                        />
                        <IconButtonV2
                          onClick={() =>
                            changeHandler(
                              "hourly_min_rate",
                              Math.max(Number(hourly_min_rate) - 1, 0),
                            )
                          }
                          iconType="TRIANGLE-ARROW-SOLID"
                          className="p-0 rotate-180"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <span className="mb-2 block font-inter font-semibold text-xs leading-4 text-dark-gray">
                      Maximum
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex border-b border-b-dark-gray w-20 pb-[6px]">
                        <span className="font-inter text-xs leading-4 text-dark-gray">$</span>
                        <input
                          name="max"
                          placeholder="200"
                          value={hourly_max_rate}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            changeHandler("hourly_max_rate", e.target.value)
                          }
                          className="border-none h-4 w-14 py-0 px-1 rounded-none shadow-none"
                        />
                        <span className="font-inter text-xs leading-4">/hr</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <IconButtonV2
                          onClick={() =>
                            changeHandler("hourly_max_rate", Number(hourly_max_rate) + 1)
                          }
                          iconType="TRIANGLE-ARROW-SOLID"
                          className="p-0"
                        />
                        <IconButtonV2
                          onClick={() =>
                            changeHandler(
                              "hourly_max_rate",
                              Math.max(hourly_max_rate - 1, 0, hourly_min_rate + 1),
                            )
                          }
                          iconType="TRIANGLE-ARROW-SOLID"
                          className="p-0 rotate-180"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={resetHandler}
                  className="ml-auto w-fit mt-1 mb-3 right-5 text-[#8A8A8A] font-semibold text-xs"
                >
                  Reset
                </button>
              </Popover.Panel>
            </Transition>
          </>
        );
      }}
    </Popover>
  );
}

function MarkDown({ open }: { open: boolean }): ReactElement {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${open ? "rotate-180" : ""} transition-all duration-200`}
    >
      <path
        d="M13.1263 6.45962C13.3802 6.20578 13.3802 5.79422 13.1263 5.54038C12.8725 5.28654 12.4609 5.28654 12.2071 5.54038L13.1263 6.45962ZM8.00004 10.6667L7.54042 11.1263C7.66232 11.2482 7.82765 11.3167 8.00004 11.3167C8.17243 11.3167 8.33776 11.2482 8.45966 11.1263L8.00004 10.6667ZM3.79299 5.54038C3.53915 5.28654 3.1276 5.28654 2.87375 5.54038C2.61991 5.79422 2.61991 6.20578 2.87375 6.45962L3.79299 5.54038ZM12.2071 5.54038L7.54042 10.207L8.45966 11.1263L13.1263 6.45962L12.2071 5.54038ZM8.45966 10.207L3.79299 5.54038L2.87375 6.45962L7.54042 11.1263L8.45966 10.207Z"
        fill={open ? "#161719" : "#A9ACB1"}
      />
    </svg>
  );
}
