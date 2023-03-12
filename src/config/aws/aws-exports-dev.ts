const awsConfig = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "us-west-1:12da32e4-d78e-4f67-8cc4-ac38adfb3952",
    // REQUIRED - Amazon Cognito Region
    region: "us-west-1",
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-west-1_IQ8qffeE9",
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "5lps193lvr6pdkhjaivart3l7t",
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,
  },
  oauth: {
    domain: "outdefine.auth.us-west-1.amazoncognito.com",
    scope: ["email", "openid", "profile", "aws.cognito.signin.user.admin"],
    redirectSignIn: `${window.location.origin}`,
    redirectSignOut: `${window.location.origin}/login?logout=true`,
    responseType: "token", // or 'token', note that REFRESH token will only be generated when the responseType is code
  },
  API: {
    endpoints: [
      {
        name: "dev-outdefine-app-backend",
        endpoint:
          "https://by9l3ro807.execute-api.us-west-1.amazonaws.com/dev/outdefine",
      },
      {
        name: "dev-outdefine-app-backend-authorization",
        endpoint:
          "https://dr552jpkj7.execute-api.us-west-1.amazonaws.com/dev/outdefine",
      },
    ],
  },
  Storage: {
    AWSS3: {
      bucket: "outdefine-applicant-resume-bucket", //REQUIRED -  Amazon S3 bucket
      region: "us-west-1",
    },
  },
};

export default awsConfig;
