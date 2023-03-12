export const getFormData = (form: any) => {
  const formData = new FormData(form);
  const data: any = {};
  formData.forEach((value, key) => (data[key] = value));
  return data;
};
