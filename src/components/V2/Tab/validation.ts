export const validateInitIndex = (
  initIndex: number | undefined,
  tabs: Array<any>,
  contents: Array<any>,
) => {
  if (initIndex === undefined || initIndex <= 0) return 0;

  const minLength = Math.min(tabs.length, contents.length);
  return Math.min(minLength, initIndex);
};
