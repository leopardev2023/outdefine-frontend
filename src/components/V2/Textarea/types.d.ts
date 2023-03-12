interface ITextareaV2
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  description?: string;
  limitText?: string;
  validators?: Array<Function>;
}

interface ITextAreaMakeFormat extends ITextareaV2 {
  error: boolean | undefined;
  focus: boolean;
}
