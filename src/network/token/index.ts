import { API } from "aws-amplify";

import awsUtils from "utils/awsUtils";
import { getItem } from "utils/storageUtils";

async function getWalletBalance(user_id: number) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/token/getBalance?user_id=${user_id}`;
  const myInit = {
    headers: { ...authHeader },
    response: true,
  };
  const result = await API.get(apiName, path, myInit);
  return result;
}

async function getRewardHistory(user_id: number) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/token/getRewardHistory?user_id=${user_id}`;
  const myInit = {
    headers: { ...authHeader },
    response: true,
  };
  const result = await API.get(apiName, path, myInit);
  return result;
}

async function inviteFriends(user_id: number, emailList: Array<string>) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/token/inviteFriends`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify({ user_id, emailList }),
    response: true,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

// async function addRewardHistory()
async function getReferralsHistory(user_id: number) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/token/getReferrals?user_id=${user_id}`;

  const myInit = {
    headers: { ...authHeader },
    response: true,
  };
  const result = await API.get(apiName, path, myInit);
  return result;
}

async function getAggregatedRewardHistory(
  user_id: number,
  filter = "monthly",
) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/token/getYearlyRewards?user_id=${user_id}&filter=${filter}`;
  const myInit = {
    headers: { ...authHeader },
    response: true,
  };
  const result = await API.get(apiName, path, myInit);
  return result;
}

export default {
  getWalletBalance,
  getRewardHistory,
  inviteFriends,
  getReferralsHistory,
  getAggregatedRewardHistory,
};
