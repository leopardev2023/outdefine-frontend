import isValidDomain from "is-valid-domain";

// ---------- Form validation starts-------------
const emailRegex = RegExp(/^[a-zA-Z0-9._*+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
const corporateEmailRegex = RegExp(/^[\w.+\-]+@gmail|@yahoo|@hotmail|@outlook\.com$/);

const nameRegex = RegExp(/^[a-zA-Z]+[a-zA-Z '-]+$/);
const clientPhoneRegex = RegExp(/^(\+[1-9][0-9]{1,2})[1-9][0-9]{6,15}$/);
const noSpecialCharsRegex = RegExp(/[0-9a-zA-Z.,"']+/);

const urlRegex =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/i;
const linkedinRegex = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/im;
const githubRegex = /^(http(s)?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,}\/?$/im;

// const urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const formValid = (state, errors) => {
  let valid = true;

  // validate form errors being empty
  Object.values(errors).forEach((val: any) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(state).forEach((val) => {
    (val === null || val === "") && (valid = false);
  });

  return valid;
};

const formValidApplicant = ({ ...rest }) => {
  let valid = true;

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    isDataEmpty(val) && (valid = false);
  });

  return valid;
};

const formValidData = (objectData) => {
  let valid = true;

  // validate the form was filled out
  Object.values(objectData).forEach((val) => {
    (val === null || val === "") && (valid = false);
  });

  return valid;
};

const formValidEmpty = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val: any) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === "" && (valid = false);
  });

  return valid;
};

// ---------- Form validation ends-------------

// ------- DATA VALIDATION START -------

const isNull = (item) => {
  return item === undefined || item === null;
};

const isStringEmpty = (str) => {
  if (str.constructor === String && (str.length === 0 || str === "__EMPTY__" || str === " ")) {
    return true;
  }
  return false;
};

const isDataEmpty = (data) => {
  if (isNull(data)) return true;
  if (isStringEmpty(data)) return true;
  if (
    (data.constructor === Object && Object.keys(data).length === 0) ||
    (data.constructor === Array && data.length === 0)
  ) {
    return true;
  }
  return false;
};

const validateWebsiteUrl = (text) => {
  return isValidDomain(text, { subdomain: true, allowUnicode: true });
};
// ------- DATA VALIDATION END -------

// ---------- Data manipulation starts---------

const getFirstName = (user) => {
  if (isNull(user) || isNull(user.firstName)) {
    return "";
  } else return user.firstName;
};

const getLastName = (user) => {
  if (isNull(user) || isNull(user.lastName)) {
    return "";
  } else return user.lastName;
};

const getUserId = (user) => {
  if (isNull(user) || isNull(user.userId)) {
    return null;
  } else return user.userId;
};

const getEmail = (user) => {
  if (isNull(user) || isNull(user.emailId)) {
    return "";
  } else return user.emailId;
};

const getMobileNumber = (user) => {
  if (isNull(user) || isNull(user.mobile)) {
    return "";
  } else return user.mobile;
};

const sortData = (data, keyToSort) => {
  // expecting data as "array of objects"
  if (isDataEmpty(data)) return [];
  return data.sort((itemA, itemB) => {
    return itemA[keyToSort] - itemB[keyToSort];
  });
};

const sortDataByDate = (data, keyToSort) => {
  // expecting data as "array of objects"
  if (isDataEmpty(data)) return [];
  return data.sort((itemA, itemB) => {
    //getting sorted data in descending order
    return new Date(itemB[keyToSort]).getTime() - new Date(itemA[keyToSort]).getTime();
  });
};

const whiteSpaceToHyphen = (str) => {
  return str.replace(/ /g, "-");
};

const getFullName = (user) => {
  if (isDataEmpty(user)) return "";
  const fName = isDataEmpty(user.firstName) || user.firstName === "__EMPTY__" ? "" : user.firstName;
  const lName = isDataEmpty(user.lastName) || user.lastName === "__EMPTY__" ? "" : user.lastName;
  return `${fName} ${lName}`;
};

const shuffleArray = (array) => {
  if (isDataEmpty(array)) return [];
  let index = array.length;
  // While there remain elements to shuffle…
  while (index) {
    // Pick a remaining element…
    const currentIndex = Math.floor(Math.random() * index--);
    // And swap it with the current element.
    const temp = array[index];
    array[index] = array[currentIndex];
    array[currentIndex] = temp;
  }
  return array;
};

const currencyFormatter = (amount) => {
  // Return to Indian currency format string
  if (isNull(amount)) return "";
  if (typeof amount !== "number") return amount;
  return amount.toLocaleString("en-IN");
};

const capitalizeFirstLetter = (str) => {
  if (isDataEmpty(str)) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const countCharacters = (str) => {
  if (isDataEmpty(str)) return 0;
  return str.length;
};

// keep overall minimum cutoff is 60
const maxScore = 60;
const assessmentsQualified = (overallScore) => {
  return overallScore >= 0.6 * maxScore;
};
// ---------- Data manipulation ends---------

// ---------- Jobs_Roles_Skills Utils -------
const getJobsRolesSkills = (res) => {
  const skillset = {};
  const jobs: Object[] = [];
  const roles: Record<string, Object[]> = {};
  for (const item of res as any) {
    jobs.push({ id: item.job_type_id, name: item.name });
    roles[item.job_type_id] = [];
    for (const role of item.roles as any) {
      roles[item.job_type_id].push({ id: role.role_id, name: role.name });
      skillset[role.role_id] = role?.skills?.map((item) => {
        return { id: item.id, name: item.name };
      });
    }
  }
  return { jobs, roles, skillset };
};

const filterProfileAttrs = (profile) => {
  const freelancer_profile = {
    freelancer_id: profile?.freelancer_id || null,
    level_of_experience: profile?.level_of_experience || null,
    roles_open_to:
      (profile?.roles_open_to && JSON.parse(profile?.roles_open_to).map(({ value }) => value)) ||
      null,
    skills: (profile?.skill && profile?.skills.map(({ name }) => name)) || null,
    years_of_experience: profile?.years_of_experience || null,
    hourly_rate: profile?.markup_hourly_rate || profile?.hourly_rate || null,
    role_name: profile?.Role.name || null,
  };

  return freelancer_profile;
};

export const isWorkEmail = (email: string) => {
  if (!email) {
    return false;
  }

  const idx = email.indexOf("@");
  const domain = email.substring(idx);

  const personalDomains = [
    "@gmail.com",
    "@outlook.com",
    "@protonmail.com",
    "@icloud.com",
    "@yahoo.com",
  ];

  if (personalDomains.includes(domain)) {
    return false;
  }

  return true;
};

export default {
  formValid,
  formValidApplicant,
  formValidData,
  formValidEmpty,
  isNull,
  isDataEmpty,
  getFirstName,
  getLastName,
  sortData,
  sortDataByDate,
  whiteSpaceToHyphen,
  getFullName,
  getUserId,
  getEmail,
  getMobileNumber,
  shuffleArray,
  currencyFormatter,
  capitalizeFirstLetter,
  countCharacters,
  assessmentsQualified,
  emailRegex,
  nameRegex,
  corporateEmailRegex,
  noSpecialCharsRegex,
  // urlRegex,
  urlRegex,
  linkedinRegex,
  githubRegex,
  validateWebsiteUrl,
  clientPhoneRegex,
  getJobsRolesSkills,
  filterProfileAttrs,
};
