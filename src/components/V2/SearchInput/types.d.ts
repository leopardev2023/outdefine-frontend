interface ISearchInput extends React.InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  validators?: Array<Function>;
  icon?: React.ReactElement;
}

interface IIMakeFormat extends ISearchInput {
  error: boolean | undefined;
  focus: boolean;
}
