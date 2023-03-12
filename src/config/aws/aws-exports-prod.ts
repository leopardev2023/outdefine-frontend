const awsConfig = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "us-east-1:944728e5-17e3-4175-aebc-53f48aa807b7",
    // REQUIRED - Amazon Cognito Region
    region: "us-east-1",
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-east-1_XVW88aQO4",
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "7lbet9sr9bs3tc5pdoe427m155",
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,
  },
  oauth: {
    domain: "outdefine.auth.us-east-1.amazoncognito.com",
    scope: ["email", "openid", "profile", "aws.cognito.signin.user.admin"],
    redirectSignIn: `${window.location.origin}`,
    redirectSignOut: `${window.location.origin}/login`,
    responseType: "token", // or 'token', note that REFRESH token will only be generated when the responseType is code
  },
  API: {
    endpoints: [
      {
        name: "prod-outdefine-app-backend",
        endpoint:
          "https://j0kzom1x6e.execute-api.us-east-1.amazonaws.com/prod/outdefine",
      },
      {
        name: "prod-outdefine-app-backend-authorization",
        endpoint:
          "https://j0kzom1x6e.execute-api.us-east-1.amazonaws.com/prod/outdefine",
      },
    ],
  },
  Storage: {
    AWSS3: {
      bucket: "prod-outdefine-resume", //REQUIRED -  Amazon S3 bucket
      region: "us-east-1",
    },
  },
};

export default awsConfig;
