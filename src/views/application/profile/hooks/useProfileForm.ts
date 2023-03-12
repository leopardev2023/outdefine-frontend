import { RootState } from "app/store";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";

const useProfileForm = (initialState: ITalentProfileV2) => {
  const skills = useSelector((root: RootState) => root.prototype.skills);
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleManualChange = (name: string, value: string | any[] | number) => {
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
    value: string,
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

  const skillChangeHandler: Function = (
    name: "skills" | "secondary_skills",
    value: number,
  ): void => {
    if (formData.skills?.map((elem) => elem.id).includes(value)) return;
    if (
      formData.skills &&
      formData.skills?.filter((elem) =>
        name === "skills"
          ? elem.freelancer_skill.is_primary
          : !elem.freelancer_skill.is_primary,
      ).length >= 5
    ) {
      return;
    }

    const _skills = formData?.skills.filter((elem) => elem.id !== value);
    handleManualChange("skills", [
      ..._skills,
      {
        ...skills.find((elem) => elem.id === value),
        freelancer_skill: {
          skillId: value,
          freelancerProfileFreelancerId: formData.freelancer_id,
          is_primary: name === "skills",
        },
      },
    ]);
  };

  const handleRemoveSkills = (
    variant: "primary" | "secondary",
    value: string,
  ) => {
    const _skills = formData.skills.filter((elem) =>
      variant === "primary"
        ? elem.freelancer_skill.is_primary
          ? elem.name !== value
          : true
        : elem.freelancer_skill.is_primary
          ? true
          : elem.name !== value,
    );
    handleManualChange("skills", _skills);
  };

  const handleRoleChange = (
    name: string,
    value: string,
    indexValue: number,
  ) => {
    setFormData({
      ...formData,
      role: indexValue,
      Role: { ...formData.Role, name: value, role_id: indexValue },
    });
  };

  return {
    formData,
    handleInputChange,
    handleManualChange,
    handleRoleChange,
    handleChangeInObject,
    handleManualChangeInObject,
    handleRemoveSkills,
    skillChangeHandler,
  };
};

export default useProfileForm;
