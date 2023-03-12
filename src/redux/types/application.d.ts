interface ApplicationState {
  invoice: {
    amount: number;
    charges: any;
    company_id: number;
    date_due: string;
    date_issued: string;
    freelancer_id: number;
    other_charges: any;
    position: string;
    invoice_number: number;
    invoice_type: string;
  };
  invoice_number: number;
  draft_id: number;
  teamMember: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    position: string;
    avatar: string;
  };
  client: {
    client_id: number;
    first_name: string;
    last_name: string;
    email: string;
    position: string;
    avatar: string;
  };
  offerList: Array<any>;
  declinedList: Array<any>;
  withdrawnList: Array<any>;
  jobTypes: any;
  selectedId: number;
  createdOffer: IOffer;
  actives: Array<any>;
  inActives: Array<any>;
}

interface IOffer {
  job_id: number | string;
  company_id: number | string;
  freelancer_id: number | string;
  application_id: number | string;
  client_id: number | string;
  welcome_note: string;
  position: string;
  term: string;
  experience_level: string;
  hourly_rate: number | string;
  term_of_hours: number;
  term_of_hours_duration: string;
  pay_frequency: string;
  location: string;
  timezone: string;
  position: string;
  response_due: string;
  primary_skills: string;
  secondary_skills: string;
  contract_start: string;
  contract_end: string;
  is_ongoing: boolean;
}
