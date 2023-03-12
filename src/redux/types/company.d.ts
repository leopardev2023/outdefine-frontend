interface ICompanyProfile {
  id?: number;
  is_busy: boolean;
  client_id?: number;
  // preference: ICompanyPreference;
  memebers: Array<ITeamMember>;
  reviews?: Array<ICompanyReview>;
  profile?: IClientProfile;
  company: ICompanyPreference;
  name?: string;
}

interface ICompanyPreference {
  company_id?: number;
  recruitcrm_slug?: string;
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
  phone_number?: string;
  CompanySocialLink?: ICompanySocial;
}

interface ICompanySocial {
  id?: number;
  linkedin_link?: string;
  twitter_link?: string;
  instagram_link?: string;
}

interface ITeamMember {
  client_id?: number;
  company_id?: number;
  company_name?: string;
  position?: string;
  onborading_status?: string;
  type?: string;
  date_invited?: string;
  inviter_name?: string;
  User?: IUser;
}

interface IUser {
  user_id: number;
  cognito_id?: number | null;
  first_name?: string | null;
  last_name?: string | null;
  email_id: string;
  contact_number?: string;
  user_type: "CLIENT" | "FREELANCER";
  referral_link: string;
  referred_id?: number;
  is_deleted: boolean;
  avatar?: string | null;
  background_number?: string | null;
  banner?: string | null;
}

interface ICompanyReview {
  name?: string;
  comment?: string;
  role?: string;
  avatar_url?: string;
}

interface ICompanyJob {
  busy: boolean;
  success: boolean;
  notactive: Array<any>;
  drafts: Array<any>;
  active: Array<any>;
  filled: Array<any>;
}

type TSocialProps = {
  company_id: number;
  linkedin_link?: string;
  twitter_link?: string;
  instagram_link?: string;
};

interface IClientProfile {
  client_id?: number;
  company_id?: number;
  position?: string;
  summary?: string;
  User?: IUser;
}

interface IClientProfileUserAppended extends IClientProfile {
  first_name?: string;
  last_name?: string;
  email?: string;
  position?: string;
  avatar?: string;
  background_number?: string;
}
