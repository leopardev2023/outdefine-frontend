import { API } from "aws-amplify";
import axios from "axios";
import awsUtils from "utils/awsUtils";
import { getItem } from "utils/storageUtils";

async function createUser(userInfo) {
  const authHeader = await awsUtils.getAuthHeader();
  const apiName = awsUtils.getAPIName();
  const path = `/user`;
  const myInit = {
    headers: { ...authHeader },
    body: JSON.stringify(userInfo),
    response: true,
  };
  const result = await API.put(apiName, path, myInit);
  return result;
}

async function signUp(userInfo) {
  const apiName = awsUtils.getAPIName();
  const path = `/user/signup`;
  const myInit = {
    body: JSON.stringify(userInfo),
    response: true,
  };
  const result = await API.post(apiName, path, myInit);
  return result;
}

export default {
  createUser,
  signUp,
};
