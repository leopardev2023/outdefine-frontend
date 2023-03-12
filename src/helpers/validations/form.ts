export const stringNotEmptyOrUndefined = (value: string) => {
  if (value === "" || value === undefined) {
    return false;
  }
  return true;
};
