import { ChangeEvent, useState } from "react";

const useEducationForm = (initialState: ITalentEducation) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleManualChange = (
    name: string,
    value: boolean | string | string[] | Date,
  ) => {
    setFormData({ ...formData, [name]: value });
  };

  return {
    formData,
    handleInputChange,
    handleManualChange,
  };
};

export default useEducationForm;
