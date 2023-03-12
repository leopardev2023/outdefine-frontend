import { API } from "aws-amplify";
import { IJobPosting } from "redux/types/jobposting";
import awsUtils from "utils/awsUtils";

// import types
import { ArgType } from "./type";

const getAllSavedJobs = async (freelancer_id: number | string) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/job/saved?freelancer_id=" + freelancer_id;
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: {},
  };

  const result = await API.get(apiName, path, myInit);
  return result;
};

const getAllAppliedJobs = async (freelancer_id: number | string) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/job/applied?freelancer_id=" + freelancer_id;
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: {},
  };

  const result = await API.get(apiName, path, myInit);
  return result;
};

const getAllAppliedJobsByCompanyId = async (companyId: any) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/applied/company/${companyId}`;
  const myInit = {
    headers: {
      ...authHeader,
    },
    body: {},
  };

  const result = await API.get(apiName, path, myInit);
  return result;
};

const getPathFromArg = (keyURL: string, arg: ArgType) => {
  const {
    limit,
    location,
    hourly_max_rate,
    hourly_min_rate,
    skip,
    terms,
    experience_level,
    timezone,
    visa_sponsor,
    query,
  }: ArgType = arg;

  return `/job/${keyURL}/?skip=${skip ?? 0}${limit !== undefined ? "&limit=" + limit : ""}${
    location !== undefined ? "&location=" + location : ""
  }${hourly_max_rate !== undefined ? "&hourly_max_rate=" + hourly_max_rate : ""}${
    hourly_min_rate !== undefined ? "&hourly_min_rate=" + hourly_min_rate : ""
  }${terms !== undefined ? "&terms=" + terms : ""}${
    experience_level !== undefined ? "&experience_level=" + experience_level : ""
  }${timezone !== undefined ? "&timezone=" + timezone : ""}${
    visa_sponsor !== undefined ? "&visa_sponsor=" + visa_sponsor : ""
  }${query !== undefined ? "&query=" + query : ""}`;
};

const getJobPostingByID = async (id: string | number) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/all/id/${id}`;

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: {},
  };
  const result = await API.get(apiName, path, myInit);
  return result;
};

const getRecommendedJobs = async (profile: any, arg: any) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();

  const path = getPathFromArg("recommended", arg);

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: profile,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
};

const getAllJobPosts = async (arg: ArgType) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();

  const path = getPathFromArg("all", arg);

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: {},
  };
  const result = await API.get(apiName, path, myInit);
  return result;
};

const saveOrUnsaveAJob = async (freelancer_id: number, job_id: number) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/job/save";

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify({ freelancer_id, job_id }),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
};

const applyForAJob = async (
  freelancer_id: number,
  job_id: number,
  company_id: number,
  cover_letter: string,
  token_amount: number | undefined,
) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = "/job/apply";

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify({
      freelancer_id,
      job_id,
      company_id,
      cover_letter,
      token_amount,
    }),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
};

const postAJob = async (arg: IJobPostingV2) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();

  const path = "/job";

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(arg),
  };
  const result = await API.post(apiName, path, myInit);
  return result;
};

const getAllJobPostsByCompanyID = async (id: number) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/all/company_id/${id}`;

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: {},
  };
  const result = await API.get(apiName, path, myInit);
  return result;
};

const updateJobPostingByID = async (data: IJobPostingV2) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job`;

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(data),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
};

const removeJobPostingByID = async (id: number, company_id: number) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/remove/${company_id}/${id}`;

  const myInit = {
    headers: {
      ...authHeader,
    },
  };
  const result = await API.del(apiName, path, myInit);
  return result;
};

const declineInvitation = async (application_id: number, freelancer_id: number) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/applied/decline`;

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify({ application_id, freelancer_id }),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
};

const getOffersByTalentID = async (freelancer_id: number) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/offer/all/freelancer/${freelancer_id}`;

  const myInit = {
    headers: {
      ...authHeader,
    },
  };
  const result = await API.get(apiName, path, myInit);
  return result;
};

const getInvitations = async (from: "freelancer" | "company", id: number | string) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/invitation/${from}/${id}`;

  const myInit = {
    headers: {
      ...authHeader,
    },
  };
  const result = await API.get(apiName, path, myInit);
  return result;
};

const addressInvitation = async (
  freelancer_id: number | string,
  company_id: number | string,
  job_id: number | string,
  type: "ACCEPT" | "DECLINE",
) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();

  const path = `/job/invitation/${type === "ACCEPT" ? "accept" : "decline"}`;

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify({ freelancer_id, company_id, job_id }),
  };
  const result =
    type === "ACCEPT"
      ? await API.post(apiName, path, myInit)
      : await API.put(apiName, path, myInit);
  return result;
};

const addressOffer = async (
  id: number,
  freelancer_id: number,
  company_id: number,
  method: "ACCEPTED" | "DECLINED",
) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/offer`;

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify({ id, freelancer_id, company_id, method }),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
};

const getContractsByFreelancerID = async (freelancer_id: number) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/contract/freelancer_id/${freelancer_id}`;

  const myInit = {
    headers: {
      ...authHeader,
    },
  };
  const result = await API.get(apiName, path, myInit);
  return result;
};

const updateJobContract = async (jobContract: IJobContractV2) => {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/job/contract`;

  const myInit = {
    headers: {
      ...authHeader,
    },
    body: JSON.stringify(jobContract),
  };
  const result = await API.put(apiName, path, myInit);
  return result;
};

export default {
  getAllJobPosts,
  getAllSavedJobs,
  getAllAppliedJobs,
  getJobPostingByID,
  getRecommendedJobs,
  getAllJobPostsByCompanyID,
  saveOrUnsaveAJob,
  applyForAJob,
  getInvitations,
  postAJob,
  updateJobPostingByID,
  removeJobPostingByID,
  getAllAppliedJobsByCompanyId,
  addressInvitation,
  declineInvitation,
  getOffersByTalentID,
  addressOffer,
  getContractsByFreelancerID,
  updateJobContract,
};
