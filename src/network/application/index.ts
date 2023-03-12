import { API } from "aws-amplify";

import awsUtils from "utils/awsUtils";
import { getItem } from "utils/storageUtils";

async function getCompanyList() {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/client/company`;
  const myInit = {
    headers: { ...authHeader },
    response: true,
  };
  const result = await API.get(apiName, path, myInit);
  return result?.data.all;
}

async function createInvoice(invoiceInfo: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/invoice`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(invoiceInfo),
  };
  const result = await API.put(apiName, path, myInit);
  return result.all;
}

async function getInvoiceList(invoiceInfo: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/invoice`;
  const myInit = {
    headers: { ...authHeader },
    body: invoiceInfo,
  };
  const result = await API.get(apiName, path, myInit);
  return result.all;
}
async function getInvoiceListByCompanyId(companyId: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/invoice/company/${companyId}`;
  const myInit = {
    headers: { ...authHeader },
  };
  const result = await API.get(apiName, path, myInit);
  return result.data;
}

async function getInvoiceListByFreelanceId(freelancerId: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/invoice/${freelancerId}`;
  const myInit = {
    headers: { ...authHeader },
  };
  const result = await API.get(apiName, path, myInit);
  return result.data;
}

async function getInvoiceById(invoiceId: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/invoice/${invoiceId}`;
  const myInit = {
    headers: { ...authHeader },
  };
  const result = await API.get(apiName, path, myInit);
  return result.data;
}

async function updateInvoice(invoiceInfo: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/invoice`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(invoiceInfo),
  };
  const result = await API.post(apiName, path, myInit);
  return result.all;
}

async function getTalentListByCompanyId(companyId: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  // const path = `/dev/outdefine/job/contract/talents/${companyId}`;
  const path = `/job/contract/talents/${companyId}`;
  const myInit = {
    headers: { ...authHeader },
  };
  const result = await API.get(apiName, path, myInit);
  return result?.active;
}

async function getCompanyListByFreelancerId(freelancerId: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/contract/companies/{${freelancerId}`;
  const myInit = {
    headers: { ...authHeader },
  };
  const result = await API.get(apiName, path, myInit);
  return result.data;
}

async function inviteTeamMembers(inviteInfo: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/client/profile/inviteMembers`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(inviteInfo),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function getTeamMembers(companyId: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/client/profile/getTeamMembers`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(companyId),
  };
  const result = await API.post(apiName, path, myInit);
  return result?.data;
}

async function updateTeamMember(teamMemberInfo: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/client/profile/updateTeamMember`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(teamMemberInfo),
  };
  const result = await API.post(apiName, path, myInit);
  return result.data;
}

async function deleteTeamMember(memberId: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/client/profile/${memberId}`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(memberId),
  };
  const result = await API.del(apiName, path, myInit);
  return result;
}

async function getClientProfile(clientId: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/client/profile/${clientId}`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(clientId),
  };
  const result = await API.get(apiName, path, myInit);
  return result;
}

async function updateClientProfile(clientInfo: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/client/profile/updateClientProfile`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(clientInfo),
  };
  const result = await API.post(apiName, path, myInit);
  console.log(result);
  return result;
}

async function getTalent(id: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();

  const path = `/freelancer/profile/id/${id}`;

  const myInit = {
    headers: { ...authHeader },
  };
  const result: any = await API.get(apiName, path, myInit);
  return result?.data;
}

async function getTalentList(id: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();

  const path = `/freelancer/vetted`;

  const myInit = {
    headers: { ...authHeader },
  };
  const result: any = await API.get(apiName, path, myInit);
  return result?.all;
}

async function getOfferList(from: string, id: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/offer/all/${from}/${id}`;
  const myInit = {
    headers: { ...authHeader },
    body: {},
  };
  const result = await API.get(apiName, path, myInit);
  return result?.offers;
}

async function sendInvite(inviteInfo: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/applied/invite`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(inviteInfo),
  };
  const result = await API.put(apiName, path, myInit);
  return result?.data;
}

async function createOffer(offerInfo: any) {
  const authHeader = await awsUtils.getAuthHeader();
  console.log(authHeader);

  const apiName = awsUtils.getAPIName();
  const path = `/job/offer`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(offerInfo),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function declineApplication(offerInfo: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/applied/decline`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(offerInfo),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function withdrawn(offerInfo: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/offer/withdraw`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(offerInfo),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function getTalentsFromCompanyID(companyId: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  // const path = `/dev/outdefine/job/contract/talents/${companyId}`;
  const path = `/job/contract/talents/${companyId}`;
  const myInit = {
    headers: { ...authHeader },
  };
  const result = await API.get(apiName, path, myInit);
  // return result?.active;
  return result;
}

async function sendInvitation(
  freelancer_id: number,
  company_id: number,
  job_id: number,
  calendar_link: string,
  interview_description: string,
) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();

  console.log(authHeader);

  const payload = {
    freelancer_id,
    company_id,
    job_id,
    link: calendar_link,
    introduction: interview_description,
  };

  const path = "/job/invitation/invite";

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(payload),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function interviewApplication(
  application_id: string | number,
  company_id: string | number,
  freelancer_id: number | string,
  job_id: number | string,
  introduction: string,
) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();

  const payload = {
    application_id,
    freelancer_id,
    company_id,
    job_id,
    introduction,
  };

  const path = "/job/applied/interview";

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(payload),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function moveToInterview(
  application_id: string,
  company_id: string,
  freelancer_id: string,
  job_id: string,
) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();

  const payload = {
    application_id,
    freelancer_id,
    company_id,
    job_id,
  };

  const path = "/job/applied/interview";

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(payload),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function updateContract(contractInfo: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/contract`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(contractInfo),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

export default {
  getCompanyList,
  createInvoice,
  getInvoiceList,
  getInvoiceListByFreelanceId,
  getInvoiceListByCompanyId,
  getInvoiceById,
  updateInvoice,
  getTalentListByCompanyId,
  getCompanyListByFreelancerId,
  getTeamMembers,
  updateTeamMember,
  deleteTeamMember,
  inviteTeamMembers,
  getClientProfile,
  updateClientProfile,
  getTalentList,
  getOfferList,
  interviewApplication,
  sendInvite,
  createOffer,
  declineApplication,
  withdrawn,
  getTalentsFromCompanyID,
  moveToInterview,
  sendInvitation,
  updateContract,
  getTalent,
};
