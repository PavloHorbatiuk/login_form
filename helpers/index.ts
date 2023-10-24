import dayjs from "dayjs";

export const formatDate = (date: string = "") => {
  const newDate = dayjs(date);
  const formatted = newDate.format("M/D/YYYY");
  return newDate;
};
