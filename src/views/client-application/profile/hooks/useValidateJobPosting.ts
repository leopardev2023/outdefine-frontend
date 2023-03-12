import { RootState } from "app/store";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import objectHelper from "helpers/object";

const { safeJsonArray } = objectHelper;

export default function useValidateJobPosting(data: IJobPostingV2) {
  const skills = useSelector((root: RootState) => root.prototype.skills);

  const [posting, setPosting] = useState<IJobPostingV2>(data);

  const changeHandler: Function = (
    name: string,
    value: string | number | boolean | string[] | number[],
  ): void => {
    setPosting({ ...posting, [name]: value });
  };

  const handleRemoveSkills = (
    variant: "primary_skills" | "secondary_skills",
    value: string,
  ) => {
    const removeSkill = skills.find(
      (skill) => skill.name.toLowerCase() === value.toLowerCase(),
    )?.id ?? value;

    const _skills = (safeJsonArray(posting[variant]) as number[])?.filter(
      (skill) => skill.toString() !== removeSkill?.toString(),
    );
    setPosting({ ...posting, [variant]: JSON.stringify(_skills) });
  };

  const skillChangeHandler = (
    name: "primary_skills" | "secondary_skills" | "job_title",
    value: any,
  ) => {
    if (safeJsonArray(posting[name])?.includes(value)) return;
    if (
      name === "primary_skills" &&
      posting.primary_skills &&
      safeJsonArray(posting[name])?.length >= 5
    ) {
      return;
    }
    if (
      name === "secondary_skills" &&
      posting.secondary_skills &&
      safeJsonArray(posting[name])?.length >= 5
    ) {
      return;
    }
    const skills = safeJsonArray(posting[name])?.filter(
      (elem) => elem !== value,
    );

    setPosting({
      ...posting,
      [name]: JSON.stringify(skills ? [...skills, value] : [value]),
    });
  };

  // const enabled =
  //   posting.primary_skills !== undefined &&
  //   posting.primary_skills !== "" &&
  //   posting.secondary_skills !== undefined &&
  //   posting.secondary_skills !== "" &&
  //   posting.hourly_max_rate !== undefined &&
  //   posting.hourly_min_rate !== undefined &&
  //   posting.term !== undefined &&
  //   posting.experience_level !== undefined &&
  //   posting.timezone !== undefined &&
  //   posting.location !== undefined &&
  //   posting.visa_sponsor !== undefined &&
  //   posting.number_of_hires !== undefined &&
  //   posting.job_title !== undefined &&
  //   posting.looking_for_description !== undefined &&
  //   posting.looking_for_description !== "" &&
  //   posting.description !== undefined &&
  //   posting.description !== "" &&
  //   posting.duties !== undefined &&
  //   posting.duties !== "";

  const enabled = posting.primary_skills !== undefined &&
    posting.primary_skills !== "" &&
    posting.job_title !== undefined;

  return {
    changeHandler,
    skills,
    posting,
    setPosting,
    handleRemoveSkills,
    skillChangeHandler,
    diabeldStatus: !enabled,
  };
}
