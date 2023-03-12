interface IListTextareaV2 {
  id: string;
  lists: string[];
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  limitText?: string;
  onChange: (new_lists: string[]) => void;
}

interface IListTextareFormatV2 {
  focus: boolean;
  disabled?: boolean;
  lists?: string[];
}
