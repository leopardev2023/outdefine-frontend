import { SkillFullType } from "redux/slices/prototype";

const getSkillsFromString = (skills: Array<SkillFullType>, _str: string): Array<string> => {
  const returnArray = _str
    .split(",")
    .map((_str) => parseInt(_str))
    .slice(0, 4)
    .map((skill, index) => {
      return skills.find((_skill) => _skill.id === skill)?.name || "";
    });
  return returnArray;
};

const getStringSkillFromID = (skills: Array<SkillFullType>, id: number): string => {
  return skills.find((skill) => skill.id === id)?.name || "";
};

const getFullSkillFromID = (skills: Array<SkillFullType>, id: number) => {
  return skills.find((skill) => skill.id === id);
};

const getSkillNameFromID = (skills: Array<SkillFullType>, id: number): string => {
  return skills.find((skill) => skill.id === id)?.name ?? `${id}`;
};

const getFullSkillArrayFromIdArray = (id_array: Array<number>, skills: Array<SkillFullType>) => {
  return id_array.map((id: number) => getFullSkillFromID(skills, id));
};

const getSkillNamesFromIDs = (skills: Array<SkillFullType>, id_array: Array<number>): string[] => {
  return id_array?.map((id: number) => getSkillNameFromID(skills, id));
};

const addIndexArrayElem = (list: string[], lowercase?: boolean) => {
  return list.map((elem, index) => {
    return {
      index,
      value: lowercase ? elem?.toLocaleLowerCase() : elem,
    };
  });
};

const sortSkillsByPrimarity = (skillResponse: any[]) => {
  return [...skillResponse].sort((a, b) => (a?.freelancer_skill?.is_primary ? -1 : 1));
};

export default {
  getSkillsFromString,
  getStringSkillFromID,
  getFullSkillArrayFromIdArray,
  getFullSkillFromID,
  getSkillNamesFromIDs,
  addIndexArrayElem,
  sortSkillsByPrimarity,
};
