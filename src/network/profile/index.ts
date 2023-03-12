import { API } from "aws-amplify";
import { PreferenceType, ExpType, ProjectType } from "redux/types/profile";

import awsUtils from "utils/awsUtils";

async function getAllSkills() {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/skill`;
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: {},
  };
  const result = await API.get(apiName, path, myInit);
  return result;
}

async function getUserWithEmail(email: string) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/user/${email}`;
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: {},
  };
  const result = await API.get(apiName, path, myInit);
  return result;
}

async function getUserProfile(type: string, id: number) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/${type}/profile/id/${id}`;
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: {},
  };
  const result = await API.get(apiName, path, myInit);
  return result;
}

interface UpdateSocialType {
  freelancer_id: number;
  github_link: string;
  linkedin_link: string;
  website_link: string;
}

async function updateSocialLinks(social: UpdateSocialType) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/freelancer/profile/updateSocialLink";
  const payload = social;
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(payload),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function updateUserName(email_id: string, first_name: string, last_name: string) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/user";
  const payload = {
    email_id,
    first_name,
    last_name,
  };
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(payload),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function updateAssessmentVisibility(id: number, visibility: boolean) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/freelancer/profile";
  const payload = {
    freelancer_id: id,
    assessment_visibility: visibility,
  };
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(payload),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function updatePreference(data: ITalentProfileV2) {
  const authHeader = await awsUtils.getAuthHeader();

  const apiName = awsUtils.getAPIName();
  const path = "/freelancer/profile";
  const payload = data;

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(payload),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function updateProfileSkills(user_id: number, skills: Array<ITalentSkillV2>) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/freelancer/profile/skill";
  const payload = {
    freelancer_id: user_id,
    skills,
  };
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(payload),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function updateProfileSummary(user_id: number, bio: string) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();

  const path = "/freelancer/profile";
  const payload = {
    freelancer_id: user_id,
    summary: bio,
  };
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(payload),
  };
  const result = await API.post(apiName, path, myInit);

  return result;
}

async function createProfilePortfolioBatch(email_id: string, portfolios: Array<ITalentPortfolio>) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/freelancer/profile/portfolio";

  const payload = {
    email_id,
    portfolios,
  };
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(payload),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function updateProfilePortfolioBatch(data: Array<ITalentPortfolio>) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/freelancer/profile/portfolio/batch";

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(data),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function removeProfilePortfolioBatch(freelancer_id: number, data: number[]) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/profile/portfolio/batch`;
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify({ freelancer_id, data }),
  };
  const result = await API.del(apiName, path, myInit);
  return result;
}

async function createProfileExperienceBatch(email_id: string, experiences: Array<any>) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/profile/experience`;
  const payload = {
    email_id,
    experiences,
  };
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(payload),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function updateProfileExperienceBatch(data: Array<any>) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/profile/experience/batch`;
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(data),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function removeProfileExperienceBatch(freelancer_id: number, data: number[]) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/profile/experience/batch`;
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify({ freelancer_id, data }),
  };
  const result = await API.del(apiName, path, myInit);
  return result;
}

async function createProfileEducationBatch(email_id: string, educations: Array<any>) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/profile/education`;
  const payload = {
    email_id,
    educations,
  };
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(payload),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function updateProfileEducationBatch(data: Array<ITalentEducation>) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/profile/education/batch`;
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(data),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

async function removeProfileEducationBatch(freelancer_id: number, data: number[]) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/profile/education/batch`;
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify({ freelancer_id, data }),
  };
  const result = await API.del(apiName, path, myInit);
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

async function getTalentBlanceById(freelancerId: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/balance/${freelancerId}`;
  const myInit = {
    headers: { ...authHeader },
  };

  const result = await API.get(apiName, path, myInit);
  return result;
}

async function getActiveJobsById(freelancerId: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/contract/companies/${freelancerId}`;
  const myInit = {
    headers: { ...authHeader },
  };

  const result = await API.get(apiName, path, myInit);
  return result;
}

async function updateProfileSocials(data: ITalentSocialLink) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/freelancer/profile/updateSocialLink`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(data),
  };

  const result = await API.post(apiName, path, myInit);
  return result;
}

export default {
  getAllSkills,
  getUserWithEmail,
  updateUserName,
  getUserProfile,
  updateAssessmentVisibility,
  updateSocialLinks,
  updatePreference,
  updateProfileSummary,
  updateProfileSkills,
  createProfilePortfolioBatch,
  updateProfilePortfolioBatch,
  removeProfilePortfolioBatch,
  createProfileExperienceBatch,
  updateProfileExperienceBatch,
  removeProfileExperienceBatch,
  createProfileEducationBatch,
  updateProfileEducationBatch,
  removeProfileEducationBatch,
  uploadCoverPhoto,
  getTalentBlanceById,
  getActiveJobsById,
  updateProfileSocials,
};
