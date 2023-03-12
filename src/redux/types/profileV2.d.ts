interface ITalentProfileV2 {
  is_busy: boolean;
  FreelancerProfileEducations: ITalentEducation[];
  FreelancerProfileExperiences: ITalentExperience[];
  FreelancerProfilePortfolios: ITalentPortfolio[];
  FreelancerProfileSocialLink: ITalentSocialLink;
  User: IUser;
  Role: IPrimaryRole;
  assessment_visibility: boolean;
  city: string;
  country: string;
  dial_code: string;
  phone_number: string;
  freelancer_id: number;
  first_name: string;
  last_name: string;
  hourly_rate: number;
  markup_hourly_rate?: string | number;
  job_type: number;
  level_of_experience: string;
  primary_role: number;
  // profession: string;
  is_trusted_talent: string | null;
  industry_id: number;
  role: number;
  resume: any;
  roles_open_to: string;
  terms_open_to: string;
  skills: ISkillInProfile[];
  summary: string;
  years_of_experience: string;
}

interface ITalentPortfolio {
  completed_date: Date;
  cover_images: string;
  cover_images_preshow: string;
  freelancer_id?: number;
  id?: number;
  project_description: string;
  project_links: string;
  project_name: string;
  role: string;
}

interface ITalentSocialLink {
  freelancer_id: number;
  github_link?: string;
  linkedin_link?: string;
  website_link?: string;
}

interface IPrimaryRole {
  role_id?: number;
  name: string;
}

interface ISkillInProfile {
  id: number;
  role_id: number;
  name: string;
  freelancer_skill: ITalentSkillV2;
}

interface ITalentSkillV2 {
  id: number;
  freelancerProfileFreelancerId: number;
  skillId: number;
  is_primary: boolean;
}

interface ITalentExperience {
  company_name: string;
  position: string;
  term: string;
  start_date: Date;
  end_date: Date;
  summary: string;
}

interface ITalentEducation {
  name: string;
  major: string;
  degree: string;
  start_date: Date;
  end_date: Date;
  self_taught: boolean;
}
