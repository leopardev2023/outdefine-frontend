import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { ChangeEvent, useState } from "react";
import {
  createProfilePortfolioBatch,
  updateProfilePortfolioBatch,
  uploadPortfolioCoverImage,
} from "redux/slices/profile";

import Button from "components/Button/ButtonV2";
import Heading from "components/Heading/HeadingV2";
import IconV2 from "components/V2/Icons";
import InputV2 from "components/V2/Input/InputV2";
import TextareaV2 from "components/V2/Textarea/TextareaV2";
import LabelWrapperV2 from "./Wrapper.LabelV2";

import { ReactComponent as Logo } from "assets/svg/dark-logo.svg";

import useProjectForm from "../hooks/useProjectForm";
import MonthPickerV2 from "components/V2/MonthPicker";
import useWindowDimensions from "hooks/utils/useWindowDimensions";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

const initialPortfolio: ITalentPortfolio = {
  completed_date: new Date(),
  cover_images: "",
  cover_images_preshow: "",
  project_description: "",
  project_links: "",
  project_name: "",
  role: "",
};

export default function ProjectFormV2(props: IPortfolioForm) {
  const { isXs } = useWindowDimensions();
  const is_busy = useSelector((root: RootState) => root.profile.is_busy);
  const email_id = useSelector((root: RootState) => root.profile.User.email_id);
  const dispatch = useDispatch<AppDispatch>();

  const { isOkayToSubmit, formData, handleInputChange, handleManualChange } = useProjectForm(
    props.formType === "CREATE" ? initialPortfolio : props.project,
  );
  const [imageFile, setImageFile] = useState<File>();

  const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const image = e.target.files[0];
    handleManualChange("cover_images_preshow", URL.createObjectURL(image));
    setImageFile(image);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (props.formType === "CREATE") {
      try {
        if (formData.cover_images !== formData.cover_images_preshow) {
          try {
            if (!imageFile) return;
            const result = await dispatch(uploadPortfolioCoverImage(imageFile));
            await dispatch(
              createProfilePortfolioBatch({
                email_id,
                data: [{ ...formData, cover_images: result.payload.s3_link }],
              }),
            );

            toast.custom(<Toast type="success" message="Successfully created a project" />);
            props.onClose();
            return;
          } catch (e) {
            toast.custom(<Toast type="error" message="There was an error while uploading cover image" />);
          }
        } else {
          await dispatch(createProfilePortfolioBatch({ email_id, data: [formData] }));
        }

        toast.custom(<Toast type="success" message="Successfully created a project" />);
      } catch (e) {
        toast.custom(<Toast type="error" message="There was an error while creating a project" />);
      }
      props.onClose();
      return;
    }

    try {
      if (formData.cover_images !== formData.cover_images_preshow) {
        try {
          if (!imageFile) return;
          const result = await dispatch(uploadPortfolioCoverImage(imageFile));
          await dispatch(
            updateProfilePortfolioBatch([{ ...formData, cover_images: result.payload.s3_link }]),
          );
          toast.custom(<Toast type="success" message="Successfully updated a project" />);
          props.onClose();
        } catch (e) {
          toast.custom(<Toast type="error" message="There was an error uploading this image, please try again." />);
          handleManualChange("cover_images_preshow", formData.cover_images);
          return;
        }
      } else {
        await dispatch(updateProfilePortfolioBatch([formData]));
        toast.custom(<Toast type="success" message="Successfully updated a project" />);
      }
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error while updating a project" />);
    }
    props.onClose();
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
      className="flex flex-col items-center w-full bg-white rounded-lg relative pt-16 pb-8 px-14"
    >
      <button onClick={props.onClose} className="absolute top-7 right-7">
        <IconV2 iconType="CLOSE" />
      </button>
      <Heading variant="h6" className="font-semibold leading-[150%]">
        {props.formType === "CREATE"
          ? "Add a project"
          : props.formType === "EDIT"
          ? "Edit project"
          : ""}
      </Heading>
      <div className="mt-9 flex w-full h-[136px] rounded-lg bg-[#D8D8D8] relative overflow-hidden">
        {formData.cover_images_preshow && (
          <img
            src={formData.cover_images_preshow}
            alt="project cover image"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
          />
        )}
        {!formData.cover_images_preshow && <Logo className="w-28 h-28 opacity-30 m-auto" />}
        <div className="absolute flex top-0 right-0 w-full h-full">
          <label className="mt-20 cursor-pointer mx-auto bg-theme text-white rounded-lg font-poppins font-semibold text-sm flex px-5 h-10 items-center gap-4">
            <input onChange={imageUploadHandler} type="file" hidden />
            <IconV2 iconType="UPLOADWHITE" />
            Upload image
          </label>
        </div>
      </div>
      <LabelWrapperV2 className="mt-9 w-full" label="Project name">
        <InputV2
          name="project_name"
          value={formData.project_name}
          onChange={handleInputChange}
          className="text-xs"
          placeholder="Name your project"
          disabled={is_busy}
        />
      </LabelWrapperV2>
      <LabelWrapperV2 className="mt-5 w-full" label="Tell us about your project">
        <TextareaV2
          name="project_description"
          value={formData.project_description}
          onChange={handleInputChange}
          className="h-[134px] text-xs"
          limitText="100 word max"
          placeholder="Description"
          disabled={is_busy}
        />
      </LabelWrapperV2>
      <div className={`mt-5 w-full grid gap-x-10 gap-y-5
      ${isXs ? "" : "grid-cols-2" }
      `}>
        <LabelWrapperV2 label="Your role in this project">
          <InputV2
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="text-xs"
            icon={<IconV2 iconType="USER" iconClassName="w-4 h-4" />}
            placeholder="Your role"
            disabled={is_busy}
          />
        </LabelWrapperV2>
        <LabelWrapperV2 label="Date completed">
          <MonthPickerV2
            icon={<IconV2 iconType="DATE" iconClassName="w-4 h-4" />}
            value={{
              month: new Date(formData.completed_date).getMonth() + 1,
              year: new Date(formData.completed_date).getFullYear(),
            }}
            onChange={(payload) => {
              handleManualChange("completed_date", new Date(payload.year, payload.month - 1, 1));
            }}
          />
        </LabelWrapperV2>
        <LabelWrapperV2 label="Project link">
          <InputV2
            name="project_links"
            value={formData.project_links}
            className="text-xs"
            icon={<IconV2 iconType="WORLD" iconClassName="w-4 h-4" />}
            placeholder="Project url"
            onChange={handleInputChange}
            disabled={is_busy}
          />
        </LabelWrapperV2>
      </div>
      <Button
        disabled={!isOkayToSubmit}
        type="submit"
        loading={is_busy}
        className="mt-9 px-0 w-[180px]"
      >
        {props.formType === "CREATE"
          ? "Add project"
          : props.formType === "EDIT"
          ? "Save changes"
          : ""}
      </Button>
    </form>
  );
}
