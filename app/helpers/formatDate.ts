import { months } from "./enums";

export const formatDate = (date: string) => {
  if (date.includes("-")) {
    const dateArray = date.split("-");
    const year = parseInt(dateArray[0]);
    const month = months.find(
      (month) => month.number === parseInt(dateArray[1])
    );
    const day = parseInt(dateArray[2]);
    return `${month?.name} ${day}`;
  }
};
