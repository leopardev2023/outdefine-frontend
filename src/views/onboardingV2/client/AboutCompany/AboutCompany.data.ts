export const Industry = [
  { id: 1, value: "Web3" },
  { id: 2, value: "Finance" },
  { id: 3, value: "Saas" },
  { id: 4, value: "Mobile" },
  { id: 5, value: "Marketplace" },
  { id: 6, value: "Retail" },
  { id: 7, value: "Health & Wellness" },
  { id: 8, value: "Software" },
  { id: 9, value: "Digital Infrastructure" },
  { id: 10, value: "Entertainment" },
  { id: 11, value: "Aviation" },
  { id: 12, value: "Analytics" },
];

export const NumberOfEmployees = [
  { id: 1, value: "1-10" },
  { id: 2, value: "10-50" },
  { id: 3, value: "50-100" },
  { id: 4, value: "100-500" },
  { id: 5, value: "500+" },
];

export const CompanyStage = [
  { id: 1, value: "Pre-funded" },
  { id: 2, value: "Early stage" },
  { id: 3, value: "Large stage startup" },
  { id: 4, value: "Public corporation" },
  { id: 5, value: "Other" },
];

export const TermOFOpenRoles = [
  { id: 1, value: "Part time contract" },
  { id: 2, value: "Full time contract" },
  { id: 3, value: "Direct Hire" },
];

export const NumberOfOpenRoles = [
  { id: 1, value: "1-10" },
  { id: 2, value: "1-50" },
  { id: 3, value: "50-100" },
  { id: 4, value: "100-500" },
  { id: 5, value: "500+" },
];

export interface Resume {
  name: string;
  website: string;
  inidustry: Record<any, any>;
  numberOfEmployees: Record<any, any>;
  companyStage: Record<any, any>;
  termOfOpenRoles: Record<any, any>;
  numberOfOpenRoles: Record<any, any>;
  headQuartersCity: string;
  country: string;
}
