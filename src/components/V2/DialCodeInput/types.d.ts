interface IDialCodeObject {
  id: number;
  value: string;
  code: string;
}

interface IDialCodeInput extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: IDialCodeObject;
  ref?: any;
}
