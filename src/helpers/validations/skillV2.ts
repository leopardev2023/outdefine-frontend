export const validateSkillV2 = (
  skills: Array<SkillFullType>,
  _str: string,
  wantSuggestion: boolean,
): IValidSkillResponse => {
  const response: IValidSkillResponse = {
    index: -1,
    success: false,
    suggestion: "",
  };

  for (let i = 0; i < skills.length; i++) {
    if (skills[i].name.toLowerCase() === _str.toLowerCase()) {
      response.index = skills[i].id;
      response.success = true;
      break;
    }
  }
  if (!wantSuggestion) return response;

  return response;
};
