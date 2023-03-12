interface IRateRangeDropdown {
  buttonText: string;
  buttonClassName?: string;
  popupClassName?: string;
  directionUp?: boolean;
}

interface IJobContractV2 {
  id: number;
  freelancer_id: number;
  company_id: number;
  contract_start: string;
  contract_end: string;
  contract_status: string;
  duties: string;
  hourly_rate: number;
  is_ongoing: boolean;
  location: string;
  pay_frequency: string;
  position: string;
  primary_skills: string;
  secondary_skills: string;
  term_of_hours: number;
  term_of_hours_duration: string;
  timezone: string;
  experience_level: string;
  term: string;
  inactivated_date: string;
  Company: ICompanyPreference;
  FreelancerProfile: ITalentProfileV2;
  User: any;
}
