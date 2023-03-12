import { ReactElement, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { validateInitIndex } from './validation';

interface ITabV2WithNavigation {
  addClass?: string;
  tabs: Array<string>;
  tabClass?: string;
  contents: Array<ReactElement>;
  activeTabTextColor?: string;
  inactiveTabTextColor?: string;
  contentWrapperClass?: string;
  wrapperAsFragment?: boolean;
  initIndex?: number;
  tabNavigations?: Array<string>;
  onTabChange?: (tabIndex: number) => void;
  activeTab: number;
}


const TabV2WithNavigation: React.FC<ITabV2WithNavigation> = ({
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
  onTabChange,
  activeTab
}): ReactElement => {
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

  useEffect(()=>{
    setIndex(activeTab)
  },[activeTab])

  return (
    <>
      <div
        data-cy="tab-navigation-container"
        className={`flex gap-1 w-fit p-1 bg-[#D9D9D9] rounded-lg ${
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
            } ${tabClass ?? ''}`}
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

export default TabV2WithNavigation;
