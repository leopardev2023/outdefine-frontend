export interface IJobPosting {
  id?: number;
  company_id?: string | number;
  client_id?: string | number;
  job_title?: string;
  company_name?: string;
  description?: string;
  benefits?: Array<string>;
  skills?: Array<number>;
  experience_level?: string;
  location?: string;
  term?: string;
  timezone?: string;
  visa?: boolean | string;
  rate?: string;
  contact_email?: string;
  company_number?: number;
  website?: string;
  status?: string;
  rateMax?: number;
  rateMin?: number;
  hourly_max_rate?: number;
  hourly_min_rate?: number;
  primary_skills?: Array<number>;
  visa_sponsor?: boolean;
  contactor_id?: number;
  draft?: boolean;
}
