interface IValidSkillResponse {
  success: boolean;
  suggestion: string;
  index: number;
}

interface SkillFullType {
  id: number;
  name: string;
  role_id: number;
}

interface ISkillInputV2 extends React.InputHTMLAttributes<HTMLInputElement> {
  onAddSkill: (idx: any) => void;
  skillData?: SkillFullType[];
  directionUp?: boolean;
}

interface IJobInput extends React.InputHTMLAttributes<HTMLInputElement> {
  onAddJob: (idx: any) => void;
  data?: any;
  directionUp?: boolean;
}