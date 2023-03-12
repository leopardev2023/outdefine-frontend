const validateEmail = (email: string | null) => {
  if (email === null) return false;

  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex) && email.match(/^\S+@\S+\.\S+$/)) {
    return true;
  }
  return false;
};

export default validateEmail;
