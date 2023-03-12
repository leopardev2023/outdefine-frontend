interface IDataSearchSelect {
  id: string | number;
  value: string;
}

interface ISearchSelect {
  data: Array<IDataSearchSelect>;
  onChange?: (idx: number | undefined) => void;
  defaultValue?: string | number;
  placeholder?: string;
  withBadge?: boolean;
  badgeClass?: string;
  className?: string;
}
