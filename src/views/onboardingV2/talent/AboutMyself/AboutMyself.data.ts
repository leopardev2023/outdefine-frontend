export interface Resume {
  firstName: string;
  lastName: string;
  experience: Record<any, any>;
  education: Record<any, any>;
}

export const skillTip =
  "To select your skills, type in a skill in the field below. Choose up to 5 skills for each category. Primary skills are skills you would consider yourself to be proficient or advanced in, while your secondary skills are skills your beginner to intermediate in.";

export interface Props {
  setNextStepEnabled: (enabled: boolean) => void;
}
