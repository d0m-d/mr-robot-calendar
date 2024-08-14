export const parseDate = (date: string) => {
  const dateArr = date.split("-");
  const dateWithoutYear = `${dateArr[1]}${dateArr[2]}`;
  return parseInt(dateWithoutYear);
};
