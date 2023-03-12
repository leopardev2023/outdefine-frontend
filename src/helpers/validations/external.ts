export const urlValidator = (value: string) => {
  // https://
  if (value.slice(0, 8) === "https://" || value.slice(0, 7) === "http://") {
    return true;
  }
  return false;
};

export const urlOptionalValidator = (value?: string) => {
  // https://
  if (value === undefined || value === "") {
    return true;
  }
  if (value.slice(0, 8) === "https://" || value.slice(0, 7) === "http://") {
    return true;
  }
  return false;
};
