interface IEmailsInput {
  data: Array<string>;
  onChange: Function;
  currentValue: string;
  onCurrentChange: (value: string) => void;
}
