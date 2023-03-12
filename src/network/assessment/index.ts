import { API } from "aws-amplify";

import awsUtils from "utils/awsUtils";
import { getItem } from "utils/storageUtils";

async function syncTestsDB() {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/test_bank`;
  const myInit = {
    headers: { ...authHeader },
    response: true,
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function getAllTests() {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/test_bank`;
  const myInit = {
    headers: { ...authHeader },
    response: true,
  };
  const result = await API.get(apiName, path, myInit);
  return result;
}

async function getRecommendedTest(req: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/test_bank`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify({ ...req }),
    response: true,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function getBookingUidByTime(req: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/calendar/bookingUidByTime`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify({ ...req }),
    response: true,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function getBookingByUid(booking_uid: string) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/calendar/bookingByUid?booking_uid=${booking_uid}`;
  const myInit = {
    headers: { ...authHeader },
    response: true,
  };
  const result = await API.get(apiName, path, myInit);
  return result;
}

async function scheduleInterview(req: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/calendar/scheduleInterview`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify({ ...req }),
    response: true,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function getAssessmentInfoByEmail(req: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/info/getOneByEmail/${req.email_id}`;
  const myInit = {
    headers: { ...authHeader },
    // body: JSON.stringify({ ...req }),
    response: true,
  };
  const result = await API.get(apiName, path, myInit);
  return result;
}

async function startMcqAssessment(req: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/hackerearth/startMcqAssessment`;
  const myInit = {
    headers: { ...authHeader },
    response: true,
    body: JSON.stringify(req),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function startCodingAssessment(req: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/hackerearth/startCodingAssessment`;
  const myInit = {
    headers: { ...authHeader },
    response: true,
    body: JSON.stringify(req),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function startAssessment(req: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/hackerearth/startAssessment`;
  const myInit = {
    headers: { ...authHeader },
    response: true,
    body: JSON.stringify(req),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function getAssessmentReportByEmail({ test_id, email_id }) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/report/getOneByEmail?test_id=${test_id}&email_id=${email_id}`;
  const myInit = {
    headers: { ...authHeader },
    response: true,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function updateUserVetStatus({ vet_status }) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/user`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify({ vet_status }),
    response: true,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function updateInterviewScheduled(email_id) {
  // assessment/info/updateInterviewScheduled
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/info/updateInterviewScheduled`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify({ email_id }),
    response: true,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function cancelCandidateRoleConfirmation(freelancer_id) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/info/cancelCandidateRoleConfirmation`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify({ freelancer_id }),
    response: true,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function submitIntroduction({ email_id, status }) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/info/updateIntroductionStatus`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify({ email_id, status }),
    response: true,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function getAssessmentData() {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/assessment/test_bank/getAssessmentData`;
  const myInit = {
    headers: { ...authHeader },
    response: true,
  };
  const result = await API.get(apiName, path, myInit);
  return result;
}

export default {
  syncTestsDB,
  getAllTests,
  getAssessmentReportByEmail,
  getRecommendedTest,
  getBookingUidByTime,
  getAssessmentInfoByEmail,
  getBookingByUid,
  startAssessment,
  startMcqAssessment,
  startCodingAssessment,
  updateUserVetStatus,
  scheduleInterview,
  updateInterviewScheduled,
  cancelCandidateRoleConfirmation,
  submitIntroduction,
  getAssessmentData,
};
