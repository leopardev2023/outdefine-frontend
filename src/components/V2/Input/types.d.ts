interface IInputV2 extends React.InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  validators?: Array<Function>;
  icon?: React.ReactElement;
  ref?: any;
}

interface IIMakeFormat extends IInputV2 {
  error: boolean | undefined;
  focus: boolean;
}
