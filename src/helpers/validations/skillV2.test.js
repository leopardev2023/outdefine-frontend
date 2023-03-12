import { validateSkillV2 } from './skillV2';

describe('validateSkillV2', () => {
  it('returns the index and success as true if the skill exists in the skills array', () => {
    const skills = [{ name: 'JavaScript', id: 1 }, { name: 'Python', id: 2 }];
    const result = validateSkillV2(skills, 'JavaScript', false);
    expect(result).toEqual({ index: 1, success: true, suggestion: '' });
  });

  it('returns the index and success as false if the skill does not exist in the skills array', () => {
    const skills = [{ name: 'JavaScript', id: 1 }, { name: 'Python', id: 2 }];
    const result = validateSkillV2(skills, 'Ruby', false);
    expect(result).toEqual({ index: -1, success: false, suggestion: '' });
  });
});
