const getAuthError = (err: any) => {
  let errorMessage = "";
  if (err.code === "UserNotConfirmedException") {
    errorMessage = "Your account is not verified.";
    // The error happens if the user didn't finish the confirmation step when signing up
  } else if (err.code === "PasswordResetRequiredException") {
    errorMessage = "Please reset your password.";
    // The error happens when the password is reset in the Cognito console
  } else if (err.code === "NotAuthorizedException") {
    errorMessage =
      "Email or password is incorrect. Please enter the correct details to login.";
    // The error happens when the incorrect password is provided
  } else if (err.code === "UserNotFoundException") {
    errorMessage = "You have not signed up yet. Create your account first.";
    // The error happens when the supplied username/email does not exist in the Cognito user pool
  } else {
    errorMessage = err.message;
  }
  return errorMessage;
};

export default { getAuthError };
