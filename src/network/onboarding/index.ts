import { API } from "aws-amplify";
import axios from "axios";

import awsUtils from "utils/awsUtils";
import { getItem } from "utils/storageUtils";

async function getRolesSkills() {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/jobTypes`;
  const myInit = {
    headers: { ...authHeader },
    response: true,
  };
  const result = await API.get(apiName, path, myInit);
  return result.data.all;
}

async function getFreelancerProfile(freelancerId: number) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/profile/id/${freelancerId}`;
  const myInit = {
    headers: { ...authHeader },
  };
  const result = await API.get(apiName, path, myInit);
  return result;
}

async function getClientProfile(clientId: number) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/client/profile/${clientId}`;
  const myInit = {
    headers: { ...authHeader },
  };
  const result = await API.get(apiName, path, myInit);
  return result;
}

async function createFreelancerProfile(profile: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/profile`;
  const myInit = {
    headers: { ...authHeader },
    body: profile,
  };
  const result = await API.put(apiName, path, myInit);
  return result.all;
}

async function createUser(userInfo: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/user`;
  const myInit = {
    headers: { ...authHeader },
    body: userInfo,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function uploadResume(files) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const email = getItem("email");
  const form = new FormData();
  form.append("content", files);
  const path = `/freelancer/profile/uploadResume/${email}`;
  const myInit = {
    headers: { ...authHeader },
    body: form,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function uploadCoverPhoto(files) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const form = new FormData();
  form.append("content", files);
  const path = `/freelancer/profile/portfolio/uploadCoverImage`;
  const myInit = {
    headers: { ...authHeader },
    body: form,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function updatePortfolio(portfolio) {
  const authHeader = await awsUtils.getAuthHeader();
  const { project_name, project_description, cover_images } = portfolio;
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/profile/portfolio`;
  const email = getItem(`email`);
  const portfolio_data = [
    {
      project_name,
      project_description,
      cover_images: JSON.stringify(cover_images),
    },
  ];
  const formData = {
    email_id: email,
    portfolios: portfolio_data,
  };
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(formData),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function getUserDetail(emailId = "") {
  const authHeader = await awsUtils.getAuthHeader();
  const email = emailId || getItem("email");
  const apiName = awsUtils.getAPIName();
  const path = `/user/${email}`;
  const myInit = {
    headers: { ...authHeader },
  };

  const result = await API.get(apiName, path, myInit);
  return result;
}

async function updateSocialLink(socialInfo) {
  const authHeader = await awsUtils.getAuthHeader();
  const { github_link, linkedin_link, website_link } = socialInfo;
  const user_detail = await getUserDetail();
  const apiName = awsUtils.getAPIName();
  const path = "/freelancer/profile/updateSocialLink";
  const form = {
    freelancer_id: user_detail.data.user_id,
    github_link,
    linkedin_link,
    website_link,
  };

  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(form),
  };

  const result = await API.post(apiName, path, myInit);
  return result;
}

async function updateSkills(skills) {
  const authHeader = await awsUtils.getAuthHeader();
  const user_detail = await getUserDetail();
  const apiName = awsUtils.getAPIName();
  const path = "/freelancer/profile/skill";
  const form = {
    freelancer_id: user_detail.data.user_id,
    skills,
  };

  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(form),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function confirmTalentRole(id: number, type: string) {
  const authHeader = await awsUtils.getAuthHeader();
  const user_detail = await getUserDetail();
  const apiName = awsUtils.getAPIName();
  const path = "/assessment/info/confirmCandidateRole";
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify({
      freelancer_id: user_detail.data.user_id,
      type,
      id,
    }),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function updateJobAndRoleType(jobType: number, roleType: number, roleConfirmed = false) {
  const authHeader = await awsUtils.getAuthHeader();
  const user_detail = await getUserDetail();
  const apiName = awsUtils.getAPIName();
  const path = "/assessment/info/confirmCandidateRole";
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify({
      freelancer_id: user_detail.data.user_id,
      role: roleType,
      industry_id: jobType,
    }),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function updateUser(userInfo) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/user";
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(userInfo),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function createClientProfile(clientProfileInfo) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/client/profile";
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(clientProfileInfo),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function createClientCompany(clientCompanyInfo) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/client/company";
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(clientCompanyInfo),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function updateClientSocialLink(clientSocialLinksInfo) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/client/company/updateSocialLink";
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(clientSocialLinksInfo),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function updateClientServiceAgreement(clientServiceAgreementInfo) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/client/company/updateServiceAgreement";
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(clientServiceAgreementInfo),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function addClients(clientInfo) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/client/profile/addClients";
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(clientInfo),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function uploadCompanyLogo(files, companyId) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  //const email = getItem('email');
  const form = new FormData();
  form.append("content", files);
  const path = `/client/company/logo/${companyId}`;
  const myInit = {
    headers: { ...authHeader },
    body: form,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function uploadCompanyBanner(files, companyId) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  //const email = getItem('email');
  const form = new FormData();
  form.append("content", files);
  const path = `/client/company/banner/${companyId}`;
  const myInit = {
    headers: { ...authHeader },
    body: form,
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function uploadUserAvatarLogo(files) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();

  const email = getItem("email");
  const form = new FormData();
  form.append("content", files);
  const path = `/user/avatar/${email}`;

  const myInit = {
    headers: { ...authHeader },
    body: form,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function updateOnboardingStatus(stateInfo) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/client/profile/updateOnboardingStatus";
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(stateInfo),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function getActiveMSA() {
  const authHeader = await awsUtils.getAuthHeader();
  const email = getItem("email");
  const apiName = awsUtils.getAPIName();
  const path = `/client/msa/getActiveMSA`;
  const myInit = {
    headers: { ...authHeader },
  };

  let result = await API.get(apiName, path, myInit);
  if (result.success) {
    localStorage.setItem("msa_id", result?.data.msa_id);
    const url = result.data.s3_url;
    const newPath = `/client/msa/getActiveMSA`;
    const contentResult = await axios.get(url);
    result = contentResult.data;
  }
  return result;
}

async function talentStep1(dataObj: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/onboarding/step1`;
  const myInit = {
    headers: { ...authHeader },
    body: dataObj,
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function talentStep2(dataObj: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/onboarding/step2`;
  const myInit = {
    headers: { ...authHeader },
    body: dataObj,
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function talentStep3(dataObj: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/onboarding/step3`;
  const myInit = {
    headers: { ...authHeader },
    body: dataObj,
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function talentStep4(dataObj: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/onboarding/step4`;
  const myInit = {
    headers: { ...authHeader },
    body: dataObj,
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function uploadUserBanner(files) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();

  const email = getItem("email");
  const form = new FormData();
  form.append("content", files);
  const path = `/user/banner/${email}`;

  const myInit = {
    headers: { ...authHeader },
    body: form,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function getCompanyListsFromEmail(emailId = "") {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/client/company/getCompanyListsFromEmail`;
  const email = emailId || getItem("email");
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify({ email }),
  };
  const result = await API.post(apiName, path, myInit);
  console.log(result);
  return result;
}

export default {
  getRolesSkills,
  getUserDetail,
  createFreelancerProfile,
  createUser,
  uploadResume,
  uploadCoverPhoto,
  updatePortfolio,
  updateSocialLink,
  getFreelancerProfile,
  updateSkills,
  updateUser,
  updateJobAndRoleType,
  createClientProfile,
  createClientCompany,
  updateClientSocialLink,
  updateClientServiceAgreement,
  addClients,
  uploadCompanyLogo,
  uploadUserAvatarLogo,
  updateOnboardingStatus,
  getClientProfile,
  getActiveMSA,
  talentStep1,
  talentStep2,
  talentStep3,
  talentStep4,
  // james
  uploadCompanyBanner,
  uploadUserBanner,
  confirmTalentRole,
  getCompanyListsFromEmail,
};
