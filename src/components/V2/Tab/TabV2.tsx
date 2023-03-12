import { ReactElement, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { validateInitIndex } from './validation';
import useWindowDimensions from "hooks/utils/useWindowDimensions";

const TabV2: React.FC<ITabV2> = ({
  addClass,
  tabs,
  tabClass,
  contents,
  contentWrapperClass,
  wrapperAsFragment,
  activeTabTextColor,
  inactiveTabTextColor,
  initIndex,
  tabNavigations,
  onTabChange
}): ReactElement => {
  const { isMobile } = useWindowDimensions();
  const [_, setSearchParam] = useSearchParams();

  const [index, setIndex] = useState<number>(
    validateInitIndex(initIndex, tabs, contents)
  );

  const tabClickHandler = (_index: number) => {
    if (tabNavigations !== undefined && tabNavigations[_index]) {
      setSearchParam(`tab=${tabNavigations[_index]}`);
    }
    setIndex(_index);
    onTabChange && onTabChange(_index);
  };

  return (
    <>
      <div
        data-cy="tab-container"
        className={`flex w-fit flex-wrap p-1 bg-[#D9D9D9] rounded-lg ${
          addClass ?? ''
        }`}
      >
        {tabs.map((elem, idx) => (
          <span
            onClick={() => tabClickHandler(idx)}
            className={`flex items-center justify-center rounded-lg cursor-pointer transition-all duration-150 ${
              index === idx
                ? 'bg-white ' +
                  (activeTabTextColor === undefined ? 'text-[#000000]' : '')
                : 'hover:bg-white  ' +
                  (inactiveTabTextColor === undefined
                    ? 'text-[#8A8A8A] hover:text-[#000000] '
                    : '')
            } ${tabClass ?? ''} ${isMobile ? 'basis-1/2' : ''}`}
            key={elem + idx}
          >
            {elem}
          </span>
        ))}
      </div>
      {wrapperAsFragment ? (
        contents[index]
      ) : (
        <div className={contentWrapperClass ?? ''}>{contents[index]}</div>
      )}
    </>
  );
};

export default TabV2;
