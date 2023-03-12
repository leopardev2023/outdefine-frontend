interface ITalentCardV2 {
  talent: any;
  children?: ReactNode;
  menu?: IMenu;
}

interface IOfferResponse extends IOffer {
  id: number;
  offer_status: string;
  User: any;
  FreelancerProfile: any;
  Company: ICompanyPreference;
  duties: string;
  description: string;
  requirements: string;
  welcome_note: string;
}

interface IMenu {
  texts: ReactNode[];
  actions: Array<() => void>;
}
