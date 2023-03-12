import { ChangeEvent, useState } from "react";

const useProjectForm = (initialState: ITalentPortfolio) => {
  const [formData, setFormData] = useState({
    ...initialState,
    cover_images_preshow: initialState.cover_images_preshow || initialState.cover_images,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleManualChange = (name: string, value: boolean | string | string[] | Date) => {
    setFormData({ ...formData, [name]: value });
  };

  const isOkayToSubmit =
    !!formData.project_name &&
    !!formData.project_description &&
    !!formData.role &&
    !!formData.completed_date &&
    !!formData.project_links;

  return {
    isOkayToSubmit,
    formData,
    handleInputChange,
    handleManualChange,
  };
};

export default useProjectForm;
