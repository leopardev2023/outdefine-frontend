import { SkillFullType } from "redux/slices/prototype";

// ------------------------SKILLS---------------------------- //

// validating skill(string) against those from api
const validateSkills = (
  skills: Array<SkillFullType>,
  current: string,
): number | undefined => {
  const skillID = skills.find(
    (_skill) => _skill.name.toLowerCase() === current.toLowerCase(),
  )?.id;
  return skillID;
  // return skills.findIndex((_skill) => _skill.name === current) !== -1;
};

// suggesting skill(string) from current input
const suggestSkills = (current: string): Array<string> => {
  return [];
};

export const skillsInput = {
  validateSkills,
  suggestSkills,
};

// ------------------FOR NETWORK API------------------------ //

// get user's email from localstorage
export const getUserEmail = () => {
  return localStorage.getItem("OUTDEFINE_email")?.replaceAll("\"", "");
};
