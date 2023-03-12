import { SkillFullType } from "redux/slices/prototype";
import { ProjectWithAddedType } from "views/application/profile/sections/Edit.Projects";

export interface ProfileType {
  id?: number | null;
  preference: PreferenceType;
  skills: Array<SkillFullType>;
  bio: string | null;
  projects: Array<PrjoectType>;
  assessments: AssessmentsType;
  experiences: Array<ExpType>;
  education: Array<EducationType>;
  reviews: { rating: number; data: Array<ReviewType> };
}

export interface PreferenceType {
  avatar: string;
  first_name: string;
  last_name: string;
  city: string | null;
  country: string | null;
  job_type: number | null;
  role: number | null;
  hourly_rate: number | null;
  seniortity: Seniortity;
  openTo: Array<string>;
  github_link: string;
  linkedin_link: string;
  website_link: string;
}

export interface Location {
  city: string;
  country: string;
}

export interface OutLinks {
  github: string;
  linkedin: string;
  portfolio: string;
}

export interface Seniortity {
  level: string;
  years: { min: number; max: number };
}

export interface ProjectType {
  id?: number;
  project_name: string;
  completed_date: string;
  project_description: string;
  cover_images: Array<string>;
  used_skills: Array<string>;
  outdefine?: boolean; // boolean, whether the project is received on and completed on outdefine or not
}

export interface AssessmentsType {
  visible: boolean;
  data: Array<AssessmentType>;
}

export interface AssessmentType {
  title: string;
  date: string;
  content: string;
  skill: string;
  index?: number;
}

export interface ExpType {
  id: number;
  company_name: string;
  role: number;
  start_date: string;
  end_date: string;
  skills: Array<string> | null;
  summary: string;
  experience_type: string;
}

export interface EducationType {
  id: number;
  freelancer_id: number;
  university: string;
  start_date: string;
  end_date: string;
  major: string;
  degree: string;
  education_type: string;
}

export interface ReviewType {
  company: string;
  logo: string;
  content: string;
  reviewerIcon: string;
  reviewer: string;
  reviewerRole: string;
  onClick?: any;
}

export interface CreatePortfolioType {
  email_id: string;
  data: Array<ITalentPortfolio>;
}

export interface CreateExperienceType {
  email_id: string;
  data: Array<ITalentExperience>;
}

export interface UpdateMultipleType {
  id: number;
  data: Array<any>;
}
