import utils from "./utils";

// For date formatting

// expects UTC date string & returns "Mon  Jan 06 20120" format
const getDateString = (date) => {
  if (utils.isNull(date)) return "";
  return new Date(date).toDateString();
};

const ASSESSMENT_COUNT = 20;
const ASSESSMENT_TIME = 30;
const CODING_COUNT = 2;
const CODING_TIME = 30;
const CODING_TIME_OLD = 60;
const SKILL_MCQ_COUNT = 20;
const SKILL_MCQ_TIME = 30;
const HOME_PROJECT_HOURS = 72;
const REAPPEAR_DAYS = 90;

const getAssessmentCountDownTime = (startedAt) => {
  return new Date(startedAt).getTime() + (ASSESSMENT_TIME * 60 * 1000 + 3000);
  //  1 min for each question + 3 seconds APIs time
};

const getSkillMcqCountDownTime = (startedAt) => {
  return new Date(startedAt).getTime() + (SKILL_MCQ_TIME * 60 * 1000 + 3000);
  //  1.5 min for each question + 3 seconds APIs time
};

const getCodingCountDownTime = (startedAt) => {
  return new Date(startedAt).getTime() + (CODING_TIME * 60 * 1000 + 3000);
};

const getOldCodingCountDownTime = (startedAt) => {
  return new Date(startedAt).getTime() + (CODING_TIME_OLD * 60 * 1000 + 3000);
};

const getHomeProjectCountdownTime = (startedAt) => {
  return (
    new Date(startedAt).getTime() + (HOME_PROJECT_HOURS * 60 * 60 * 1000 + 3000)
  );
};

const getReappearCountDownTime = (startedAt, roundTime) => {
  return (
    new Date(startedAt).getTime() +
    (REAPPEAR_DAYS * 24 * 60 * 60 * 1000 + roundTime * 60 * 1000)
  );
};

const getLocalDateFromUTCDate = (date: string) => {
  const localDate = new Date(date);
  const year = localDate.getFullYear();
  const month = localDate.getMonth() + 1;
  const day = localDate.getDate();
  const hours = (localDate.getHours() + "").padStart(2, "0");
  const minutes = (localDate.getMinutes() + "").padStart(2, "0");
  const senconds = (localDate.getSeconds() + "").padStart(2, "0");
  return {
    datetime: localDate,
    date: `${month}/${day}/${year}`,
    time: `${hours}:${minutes}:${senconds}`,
  };
};

export default {
  getDateString,
  getAssessmentCountDownTime,
  getSkillMcqCountDownTime,
  getCodingCountDownTime,
  getOldCodingCountDownTime,
  getHomeProjectCountdownTime,
  getReappearCountDownTime,
  getLocalDateFromUTCDate,
  ASSESSMENT_COUNT,
  ASSESSMENT_TIME,
  CODING_COUNT,
  CODING_TIME,
  HOME_PROJECT_HOURS,
  SKILL_MCQ_COUNT,
  SKILL_MCQ_TIME,
  CODING_TIME_OLD,
};
