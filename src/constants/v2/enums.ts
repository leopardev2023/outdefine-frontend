const ENUM_TERM = ["Full time contract"];
const ENUM_LEVEL_OF_EXPERIENCE = [
  "Entry-level",
  "Mid-level",
  "Senior-level",
  "Director-level",
];
const ENUM_YEARS_OF_EXPERIENCE = ["1-3", "3-5", "5-8", "8+"];
const ENUM_TIMEZONE = [
  "PST",
  "AST",
  "HST",
  "EST",
  "MST",
  "UTC-11",
  "CST",
  "AKST",
  "UTC+10",
];
const ENUM_LOCATION = ["REMOTE", "HYBRID", "ONSITE"];
const ENUM_NUMBER_OF_HIRES = ["1", "2", "3", "4", "5+"];
const ENUM_ACTIVELY_HIRING = ["ACTIVE", "NOT ACTIVE"];
const ENUM_COMPANY_INDUSTRY_TYPES = [
  "Web3",
  "Finance",
  "Saas",
  "Mobile",
  "Marketplace",
  "Retail",
  "Health & Wellness",
  "Software",
  "Digital Infrastructure",
  "Entertainment",
  "Aviation",
  "Analytics",
];
const ENUM_COMPANY_STAGE = [
  "Pre-funded",
  "Early stage",
  "Late stage startup",
  "Public corporation",
  "Other",
];
const ENUM_COMPANY_NUMBER_OF_EMPLOYEES = [
  "1-10",
  "10-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
];

const ENUM_DEGREES = [
  "High School / GED",
  "Associate Degree",
  `Bachelor's Degree`,
  `Master's Degree`,
  "Doctoral Degree",
  "Bootcamp",
  "Other",
];

const ENUM_CLIENT_POSITION = [
  "ADMIN",
  "RECRUITER",
  "HIRING MANAGER",
  "BILLILNG",
];

const ENUM_PROFESSION = ["Engineering", "Product & Design", "Business "];

const ENUMS = {
  term: ENUM_TERM,
  level: ENUM_LEVEL_OF_EXPERIENCE,
  yearsOfExperience: ENUM_YEARS_OF_EXPERIENCE,
  timezone: ENUM_TIMEZONE,
  location: ENUM_LOCATION,
  numberOfHires: ENUM_NUMBER_OF_HIRES,
  hiringStatus: ENUM_ACTIVELY_HIRING,
  industry: ENUM_COMPANY_INDUSTRY_TYPES,
  companyStage: ENUM_COMPANY_STAGE,
  companyNumberOfEmployees: ENUM_COMPANY_NUMBER_OF_EMPLOYEES,
  degree: ENUM_DEGREES,
  clientPositions: ENUM_CLIENT_POSITION,
  profession: ENUM_PROFESSION,
};

export default ENUMS;
