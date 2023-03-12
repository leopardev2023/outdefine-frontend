interface ITabV2 {
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
}
