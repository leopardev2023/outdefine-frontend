import { useState } from "react";
import { useDropzone } from "react-dropzone";
import IconV2 from "../Icons/IconV2";
import IDragDropFile from "./type";

const DragDropFile = ({ onUpload, title, defaultValue, preferredFormats = [], acceptedFormats = {} } : IDragDropFile) => {
  const [value, setValue] = useState<File | undefined>(defaultValue);

  const onDrop = (files) => {
    setValue(files[0]);
    onUpload && onUpload(files[0]);
  };

  const onClear = () => {
    setValue(undefined);
    onUpload && onUpload(undefined);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    multiple: false,
    noClick: true, // Disactive click
    noKeyboard: true, // Disactive keydown
    accept: acceptedFormats,
    onDrop,
  });

  // Format the string to display the accepted formats
  const Formats = Object.values(acceptedFormats).reduce((acumm, curr) => {
    acumm.push(...curr);
    return acumm;
  }, []).map(format => format.slice(1));

  const FormatsToString = {};

  Formats.forEach(f => {
    FormatsToString[f] = f.toUpperCase();
    if (preferredFormats.includes(f)) FormatsToString[f] += " (preferred)";
  });

  const FormatString = Object.values(FormatsToString).join(", ");

  return (
        <div className="relative w-full border-dashed border-dark-gray border-[1px] rounded ">
            { value &&
                <div onClick={onClear} className="absolute right-[2%] top-[10px] hover:cursor-pointer">
                    <IconV2 iconType="CLOSE" />
                </div>
            }
            <div className="bg-blue" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center p-[13px]">
                    <IconV2 iconType="DOCUMENT-GRAY"/>
                    <p className="text-inactive-gray text-[16px] font-inter font-semibold mt-[5px]">
                        {title || "File"}
                    </p>
                    <p className={`text-${value ? "black" : "inactive-gray"} text-[14px] font-inter mt-[5px]`}>
                        {value ? value.name : "Upload"}
                    </p>
                    <p className="text-inactive-gray text-[14px] font-inter mt-[5px]">
                        {FormatString}
                    </p>
                    <div className="flex flex-row items-center px-[10px] py-[6px]
                    text-black text-[12px] font-poppins font-semibold
                    rounded border-solid border-[1px] border-black
                    hover:cursor-pointer mt-[20px]"
                    onClick={open}
                     >
                        <IconV2 iconType="UPLOAD"/>
                        <p className="ml-[7px]">Upload</p>
                    </div>
                </div>
            </div>
        </div>
  );
};
export default DragDropFile;
