import utils from "utils/utils";

const monthObject: Record<number, string> = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

interface FieldData {
  title: string,
  label: string,
  fieldKey: string
  value?: string,
  type: string,
  controlId: string,
  isDisabled?: boolean,
}

// ---------- introduction page data ----------
const namesFieldData = (user: any): Array<FieldData> => {
  return [
    {
      title: "First name *",
      label: "Enter your first name",
      fieldKey: "firstName",
      value: utils.getFirstName(user),
      type: "text",
      controlId: "formBasic_firstName",
      isDisabled: true,
    },
    {
      title: "Last name *",
      label: "Enter your last name",
      value: utils.getLastName(user),
      fieldKey: "lastName",
      type: "text",
      controlId: "formBasic_lastName",
      isDisabled: true,
    },
  ];
};

const fullNameFieldData = (user: any): FieldData => {
  return {
    title: "Name",
    label: "Enter your name",
    fieldKey: "name",
    type: "text",
    controlId: "formBasic_name",
    isDisabled: false,
  };
};

const emailFieldData = (): FieldData => {
  return {
    title: "Email *",
    label: "Enter you email address",
    fieldKey: "email",
    type: "text",
    controlId: "formBasic_email",
    isDisabled: true,
  };
};

const locationFieldData = (): FieldData => {
  return {
    title: "Current location *",
    label: "Enter your current location",
    fieldKey: "currentCity",
    type: "text",
    controlId: "formBasic_currentCity",
  };
};

const primaryRoleData = (): Array<string> => {
  return [
    "Android Engineer",
    "iOS Engineer",
    "Frontend Engineer",
    "Backend Engineer",
    "Full Stack Engineer",
    "QA Automation Engineer",
    "Machine Learning Engineer",
    "RPA Engineer",
  ];
};

const totalExperienceData = (): Array<string> => {
  return [
    "0-1 Year",
    "2 Years",
    "3 Years",
    "4 Years",
    "5 Years",
    "6 Years",
    "7 Years",
    "8 Years",
    "9 Years",
    "10 Years",
    "11 Years",
    "12 Years",
    "13 Years",
    "14 Years",
    "15 Years",
  ];
};

const primarySkillsData = (): Array<string> => {
  return ["Android", "iOS", "JavaScript + Nodejs", "JavaScript + Reactjs", "Python", "QA", "Ruby + Rails"];
};

const secondarySkillsData = (): Array<string> => {
  return [
    "AWS",
    "Agile",
    "Algorithms",
    "Android SDK",
    "Angular",
    "AngularJS",
    "C",
    "C#",
    "C++",
    "Cocoa",
    "CSS",
    "Cucumber",
    "Data Structures",
    "DevOps",
    "Django",
    "ExpressJS",
    "Git",
    "Golang",
    "HTML",
    "Java",
    "jMeter",
    "jQuery",
    "Kotlin",
    "Laravel",
    "NoSQL",
    "Objective-C",
    "Perl",
    "PHP",
    "R",
    "ReactNative",
    "Redux",
    "REST Api",
    "Selenium",
    "Spring",
    "SQL",
    "Swift",
    "Typescript",
    "VueJS",
    "XML",
  ];
};

const getDepttData = (): Array<FieldData> => {
  return [
    {
      title: "Degree *",
      label: "Ex. - B. Tech.",
      fieldKey: "degree",
      type: "text",
      controlId: "formBasic_degree",
    },
    {
      title: "Stream *",
      label: "Ex. - Computer science",
      fieldKey: "stream",
      type: "text",
      controlId: "formBasic_stream",
    },
  ];
};

const getLinksFieldData = (): Array<FieldData> => {
  return [
    {
      title: "Linkedin url *",
      label: "Enter your Linkedin profile url",
      fieldKey: "linkedinUrl",
      type: "text",
      controlId: "formBasic_linkedinUrl",
    },
    {
      title: "Github url *",
      label: "Enter your Github url",
      fieldKey: "githubUrl",
      type: "text",
      controlId: "formBasic_githubUrl",
    },
  ];
};

const getMonthName = (monthNumber: number): string => {
  return monthObject[monthNumber];
};

// ---------- preference page data ----------
function getJobSearchStatusData(): Array<string> {
  return ["Looking for jobs in 0-1 months", "Looking for jobs in 1-3 months", "Looking for jobs in 3-6 months"];
}

function getWorkTypeData(): Array<string> {
  return ["Full Time", "Part Time", "Both"];
}

function getNoticePeriodData(): Array<string> {
  return ["Available immediately", "15 Days", "1 month", "2 months", "3 months"];
}

function getTimeOverlapData(): Array<string> {
  return ["4 Hours", "5 Hours", "6 Hours", "7 Hours", "8 Hours"];
}

function getSectorsData(): Array<string> {
  return [
    "Accounts / Finance / Tax / CS / Audit",
    "Analytics & Business Intelligence",
    "R & D",
    "IT- Hardware / Telecom /Technical Staff / Support",
    "IT Software - Application Programming / Maintenance",
    "IT Software - Client Server",
    "E-Commerce / Internet Technologies",
    "IT Software - Telecom Software",
    "IT Software - Systems / EDP / MIS",
    "IT Software - System Programming",
    "IT Software - QA & Testing",
    "IT Software - Other",
    "IT Software - Mobile",
    "IT Software - ERP / CRM",
    "IT Software - Mainframe",
    "IT Software - Middleware",
    "IT Software - Embedded / EDA /VLSI /ASIC /Chips Des.",
    "IT Software - Network Administration / Security",
  ];
}

export default {
  namesFieldData,
  fullNameFieldData,
  emailFieldData,
  locationFieldData,
  primaryRoleData,
  totalExperienceData,
  primarySkillsData,
  secondarySkillsData,
  getDepttData,
  getLinksFieldData,
  getMonthName,
  getJobSearchStatusData,
  getWorkTypeData,
  getNoticePeriodData,
  getTimeOverlapData,
  getSectorsData,
};
