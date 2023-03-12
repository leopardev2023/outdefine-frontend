const removeKey = (value: any, keys: string[]) => {
  for (let i = 0; i < keys.length; i++) {
    const { [keys[i]]: _, ...b } = value;
    value = { ...b };
  }

  return value;
};

const safeJsonArray = (value: string | undefined | null | number[]): Array<any> => {
  if (Array.isArray(value)) return value;
  if (value === "" || value === undefined || value === null) {
    return [];
  }
  try {
    const jsonArrary = JSON.parse(value);
    if (!Array.isArray(jsonArrary)) return [];
    return jsonArrary;
  } catch (e) {
    return [];
  }
};

const crateReferralFromUserData = (user: {
  first_name: string;
  last_name: string;
  createdAt: string;
}) => {
  if (user.first_name === "" || user.last_name === "" || user.createdAt === "") return "";

  return `${user.first_name}${user.last_name}-${String(
    new Date(user.createdAt).getTime() % 10000,
  ).padStart(4, "0")}`.replaceAll(" ", "");
};

export default { removeKey, safeJsonArray, crateReferralFromUserData };
