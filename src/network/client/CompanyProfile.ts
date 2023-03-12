import { API } from "aws-amplify";
import awsUtils from "utils/awsUtils";

const apiName = awsUtils.getAPIName();

const getCompanyIdFromUserId = async (id: number) => {
  const authHeader = await awsUtils.getAuthHeader();
  const path = "/client/profile/" + id;
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: {},
  };

  const result = await API.get(apiName, path, myInit);
  return result;
};

// const getCompanyProfile = async (id: number) => {
//   const authHeader = await awsUtils.getAuthHeader();
//   const path = '/client/company/' + id;
//   const myInit = {
//     headers: {
//       ...authHeader,
//     },
//     body: {},
//   };

//   const result = await API.get(apiName, path, myInit);
//   return result;
// };

const updateCompanyProfile = async (detail: ICompanyPreference) => {
  const authHeader = await awsUtils.getAuthHeader();
  const path = "/client/company";
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify({ ...detail, company_name: detail.name }),
  };

  const result = await API.post(apiName, path, myInit);
  return result;
};

const updateCompanySocialProfile = async (socialProps: TSocialProps) => {
  const authHeader = await awsUtils.getAuthHeader();
  const path = "/client/company/updateSocialLink";
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify({ ...socialProps }),
  };

  const result = await API.post(apiName, path, myInit);
  return result;
};

async function getCompanyBalanceById(clientId: any) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/client/company/balance/${clientId}`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(clientId),
  };

  const result = await API.get(apiName, path, myInit);
  return result;
}

async function getTeamMembersByCompanyId(company_id: number) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/client/profile/getTeamMembers`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify({ company_id }),
  };

  const result = await API.post(apiName, path, myInit);
  return result;
}

async function getContractsByDynamicId(
  from: "company_id" | "freelancer_id",
  id: number,
) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/contract/${from}/${id}`;
  const myInit = {
    headers: { ...authHeader },
  };

  const result = await API.get(apiName, path, myInit);
  return result;
}

async function updateClientProfile(data: IClientProfileUserAppended) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/client/profile/updateClientProfile`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(data),
  };

  const result = await API.post(apiName, path, myInit);
  return result;
}

async function updateTeamMember(data: IClientProfileUserAppended) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/client/profile/updateTeamMember`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(data),
  };

  const result = await API.post(apiName, path, myInit);
  return result;
}

const CompanyProfileAPI = {
  // getCompanyProfile,
  getCompanyIdFromUserId,
  updateCompanyProfile,
  updateCompanySocialProfile,
  getCompanyBalanceById,
  getTeamMembersByCompanyId,
  getContractsByDynamicId,
  updateClientProfile,
  updateTeamMember,
};

export default CompanyProfileAPI;
