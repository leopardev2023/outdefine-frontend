interface IJobPostingV2 {
  id?: number;
  client_id?: number;
  company_id?: number;
  company_name?: string;
  job_title?: string;
  status?: string;
  number_of_hires?: string;
  date_posted?: string;
  date_last_activated?: string;
  hourly_max_rate?: number;
  hourly_min_rate?: number;
  location?: string;
  experience_level?: string;
  term?: string;
  weekly_hours?: number;
  description?: string;
  looking_for_description?: string;
  duties?: string;
  primary_skills?: string;
  secondary_skills?: string;
  visa_sponsor?: boolean;
  timezone?: string;
  contactor_id?: number;
  contact_email?: string;
  company_number?: string;
  website?: string;
  benefits?: string;
  actively_hiring?: boolean;
  draft?: boolean;
  createdAt?: string;
  updatedAt?: string;
  Company?: ICompanyPreference;
}

interface ICompanyProfileV2 {
  company_id?: number;
  name?: string;
  summary?: string;
  website?: string;
  industry?: string;
  number_of_employees?: string;
  stage?: string;
  number_of_open_roles?: string;
  city?: string;
  country?: string;
  logo?: string;
  banner?: string;
  remote_first?: boolean;
}
