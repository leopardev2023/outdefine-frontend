import { ReactElement, useState } from "react";
import FileSaver from "file-saver";
import { useDropzone } from "react-dropzone";

import DragDropFile from "components/V2/DragDropFile/DragDropFile";
import DeleteButton from "./Button.Delete";
import IconV2 from "components/V2/Icons/IconV2";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import EditButton from "./Button.Edit";
import FORMATS from "constants/fileFormats";
import { uploadTalentResume } from "redux/slices/profile";
import Loader from "components/V2/Loader/Loader";
import useWindowDimensions from "hooks/utils/useWindowDimensions";

interface ICardResume {
    link?: string,
    userRole?: string,
}

export default function CardResume({ link, userRole } : ICardResume): ReactElement {
  const { isMobile } = useWindowDimensions();
  const [loading, setLoading] = useState<boolean>(false);

  // Handle Uploads
  const dispatch = useDispatch<AppDispatch>();
  const onUpload = async (resume) => {
    setLoading(true);
    await dispatch(uploadTalentResume(resume));
    setLoading(false);
  };

  // Generate resume file name
  const profile = useSelector((root: RootState) => root.profile);
  const splited = link ? link.split(".") : null;
  const ext = splited ? splited[splited.length - 1] : "";
  const resumeName = profile.first_name + "_" + profile.last_name + "_resume." + ext;

  // Handle download
  const handleClick = () => FileSaver.saveAs(link, resumeName);

  // Handle edit button
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: FORMATS.resume,
    onDrop: (files) => onUpload(files[0]),
  });

  if (loading) return <Loader />;
  const isFreelancer = userRole === "Freelancer";
  if (!isFreelancer && !link) return <div></div>;

  return link
    ? (
    <div className={`w-full bg-white rounded py-[17px] pl-[36px] pr-[20px] mt-[20px] mr-[5px]`}>
        <div className="flex flex-row justify-between mb-[15px]">
            <span className="text-[20px] font-poppins font-semibold ">Resume</span>
            {/* Only the talent can update its own profile */}
            {isFreelancer &&
             <div className="flex flex-row space-x-3">
                <EditButton onClick={open} />
                <DeleteButton onClick={() => onUpload(null)} />
                <div className="hidden">
                    <div {...getRootProps()} />
                    <input {...getInputProps()} />
                </div>
            </div>}
        </div>
        <div onClick={handleClick} className={`flex flex-row border-solid rounded border-dark-gray border-[1px]
        w-fit px-[16px] pt-[19px] pb-[16px] hover:cursor-pointer ${isMobile ? "w-full" : ""}`}>
            <div className="bg-odf rounded flex justify-center items-center h-[40px] w-[40px]">
                <IconV2 iconType="BOOK" />
            </div>
            <div className="flex flex-col ml-[20px] justify-between mt-[-5px] min-w-0">
                <span className="font-poppins font-bold text-[16px] ">
                    Resume
                </span>
                <span className="font-inter font-semi-bold text-[14px] text-ellipsis overflow-hidden">
                    {resumeName}
                </span>
            </div>
        </div>
    </div>
      )
    : (
        <div className="mt-[20px] mr-[5px]">
            <DragDropFile title="Resume" onUpload={onUpload}
                preferredFormats={["pdf"]} acceptedFormats={
                    FORMATS.resume
                }/>
          </div>
      );
}
