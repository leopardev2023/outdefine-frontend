interface JobStateType {
  type: string;
  loading: boolean;
  action?: "APPLY" | "SAVE" | "FETCH" | "FETCH SAVED JOBS" | "FETCH APPLICATION";
  query: JobFilterType;
  posts: Array<IJobPostingV2>;
  saved_jobs: Array<any>;
  applied_jobs: Array<any>;
  invitations: Array<any>;
  one_page_info: TOnePageInfo;
}

type TOnePageInfo = {
  jobID: number | string;
  isApplied: boolean;
  isSaved: boolean;
  isAccepted: boolean;
};

interface JobFilterType {
  skip: number;
  limit: number;
  job_title: string;
  term: IData[];
  location: IData[];
  hourly_min_rate: number;
  hourly_max_rate: number;
  filter_changed: boolean;
  skills: Array<number>;
  experience_level: IData[];
  timezone: IData[];
  visa_sponsor: IData[];
  type?: string;
  industry: IData[];
}

interface JobDataType {
  id: number;
  client_id: number;
  company_id: number;
  createdAt: string;
  date_last_activated: string;
  date_posted: string;
  description: string;
  hourly_max_rate: number;
  hourly_min_rate: number;
  annual_max_rate: number;
  annual_min_rate: number;
  id: number;
  is_hourly_rate: boolean;
  visa_sponsor: boolean;
  experience_level: string;
  timezone: string;
  is_active: true;
  job_title: string;
  location: string;
  primary_skills: string;
  role: string;
  secondary_skills: string;
  term: string;
  updatedAt: string;
  weekly_hours: number;
}

interface SavedJobType {
  id: number;
  freelancer_id: number;
  job_id: number;
  saved_date: string;
  job: JobDataType;
  PostedJobs: JobDataType;
}

interface IApplyJobParam {
  freelancer_id: number;
  job_id: number;
  company_id: number;
  cover_letter: string;
  token_amount: number | undefined;
}
