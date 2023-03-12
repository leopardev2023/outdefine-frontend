import { Auth } from "aws-amplify";
import { resolve } from "path";

import stageUtils from "./stageUtils";
import utils from "./utils";

const getAuthHeader = async () => {
  try {
    const session = await Auth.currentSession();
    return {
      Authorization: session.getAccessToken().getJwtToken(),
    };
  } catch (e) {
    return null;
  }
};

const getAPIName = () => {
  const awsConfig = stageUtils.getAWSConfig();
  return awsConfig.API.endpoints[0].name;
};

const getAuthAPIName = () => {
  const awsConfig = stageUtils.getAWSConfig();
  return awsConfig.API.endpoints[1].name;
};

const getCompilerAPIName = () => {
  return "http://ec2-3-7-45-15.ap-south-1.compute.amazonaws.com:3000";
};

const getUserCred = () => {
  return {
    key: "AKIAS5EI4PVGJIWPE77W",
    secret: "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",
  };
};

export default {
  getAuthHeader,
  getAPIName,
  getCompilerAPIName,
  getUserCred,
  getAuthAPIName,
};
