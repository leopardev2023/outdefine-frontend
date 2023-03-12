import AWS_CONFIG_DEV from "config/aws/aws-exports-dev";
import AWS_CONFIG_PROD from "config/aws/aws-exports-prod";
import { NODE_ENV } from "helpers/env";

const STAGES = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
};

// change zone start

const CURRENT_STAGE = NODE_ENV; // change to prod for deployment

// Get Stage

const getAppStage = () => {
  if (CURRENT_STAGE === STAGES.PRODUCTION) {
    return STAGES.PRODUCTION;
  } else {
    return STAGES.DEVELOPMENT;
  }
};

// change zone end

const getAWSConfig = () => {
  if (CURRENT_STAGE === STAGES.PRODUCTION) {
    return AWS_CONFIG_PROD;
  } else {
    return AWS_CONFIG_DEV;
  }
};

const getBucketRegion = () => {
  if (CURRENT_STAGE === STAGES.PRODUCTION) {
    return "us-east-1";
  } else {
    return "us-west-1";
  }
};

const getAWS3ProfileImageBucket = () => {
  if (CURRENT_STAGE === STAGES.PRODUCTION) {
    return "outdefine-applicant-profile-image-bucket-prod";
  } else {
    return "outdefine-applicant-profile-image-bucket-dev";
  }
};

export default {
  getAWSConfig,
  getBucketRegion,
  getAWS3ProfileImageBucket,
  getAppStage,
};
