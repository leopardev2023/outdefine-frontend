import { ChangeEvent, useState } from "react";

const useClientProfileForm = (initialState: IClientProfile) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleManualChange = (name: string, value: string | string[]) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeInObject = (
    e: ChangeEvent<HTMLInputElement>,
    objectName: string,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [objectName]: {
        ...formData[objectName],
        [name]: value,
      },
    });
  };

  const handleManualChangeInObject = (
    name: string,
    value: string | null,
    objectName: string,
  ) => {
    setFormData({
      ...formData,
      [objectName]: {
        ...formData[objectName],
        [name]: value,
      },
    });
  };

  return {
    formData,
    handleInputChange,
    handleManualChange,
    handleChangeInObject,
    handleManualChangeInObject,
  };
};

export default useClientProfileForm;
