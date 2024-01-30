export const getTimeDiffByMin = (before, after) => {
  const time = (new Date(before).getTime() - new Date(after).getTime()) / 60000;
  return time;
};
