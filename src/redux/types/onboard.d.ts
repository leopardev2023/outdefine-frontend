interface OnboardState {
  name: {
    firstName: string;
    lastName: string;
    dialCode: string;
    phoneNumber: string;
  };
  role: {
    jobType: any;
    roleType: any;
    preSkills: Array<any>;
    secSkills: Array<any>;
  };
  roles_skills: {
    jobs: Array<{ id: number; name: string }>;
    roles: Record<any, any>;
    skills: Record<any, any>;
  };
  experienceYears: string;
  experienceLevel: string;
  hourlyRate: number;
  rateCurrency: string;
  location: {
    country: string;
    city: string;
  };
  english: string;
  socials: {
    portfolio: string;
    github?: string;
    linkedin?: string;
  };
  coverImage: string;
  supportingImages: Array<string>;
  onboardStatus: OnboardStatus;
  company: {
    name: string;
    website: string;
    industry: Record<any, any>;
    numberOfEmployees: any;
    companyStage: any;
    termOfOpenRoles: Array<any>;
    numberOfOpenRoles: any;
    headquartersCity: string;
    country: string;
  };
  companyV: {
    name: string;
    website: string;
    dialCode: string;
    phoneNumber: string;
    industry: any;
    numberOfEmployees: any;
    companyStage: any;
    numberOfOpenRoles: any;
    city: string;
    country: string;
    remoteFlag: boolean;
  };
  employee: {
    firstName: string;
    lastName: string;
    jobPosition: string;
    jobEmail: string;
    avatar: string;
    avatarNumber: number;
    bannerNumber: number;
    checkCustomAvatar: boolean;
    pronoun: boolean;
  };
  inviteTeam: {
    teamMemberEmails: Array<any>;
    role: Array<any>;
  };
  serviceAgreement: {
    optAgree: boolean;
    optAuth: boolean;
  };
  companySocials: {
    linkedIn: string;
    twitter: string;
    instagram: string;
  };
  previewImage: string;
  previewLogo: string;
  companyLogoFile: any;
  clientLogoFile: any;
}
