import { Controller } from "react-hook-form";
import IDragDropFile from "./type";
import DragDropFile from "./DragDropFile";

interface IFormDragDrop extends IDragDropFile {
  name: string;
  control: any;
  rules?: Record<any, any>;
}

export const FormDragDropFile = ({
  name,
  control,
  rules,
  ...props
}: IFormDragDrop) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <DragDropFile
            onUpload={onChange}
            defaultValue={value}
            {...props}
          />
        )}
      />
    </>
  );
};
