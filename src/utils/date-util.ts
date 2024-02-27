import moment, { Moment } from "moment";

export const today = () => moment();

export const todayYear = () => moment().get("year");

export const todayMonth = () => moment().get("month");

export const isToday = (date: Moment) =>
  date.startOf("day").isSame(moment().startOf("day"));

export const firstDayOfMonth = (month: number, year: number) => {
  return moment(
    moment(`${month} ${year}`, "MM YYYY").startOf("months")
  ).startOf("weeks");
};

export const lastDayOfMonth = (month: number, year: number) => {
  return moment(moment(`${month} ${year}`, "MM YYYY").endOf("months")).endOf(
    "weeks"
  );
};

export const firstDayOfYear = (year: number) => {
  return moment(moment(`01 ${year}`, "MM YYYY").startOf("months")).startOf(
    "weeks"
  );
};

export const lastDayOfYear = (year: number) => {
  return moment(moment(`12 ${year}`, "MM YYYY").endOf("months")).endOf("weeks");
};

export const isDateSameOrBefore = (date1: Moment, date2: Moment) =>
  date1.startOf("day").isSameOrBefore(date2.startOf("day"));

export const isDateSame = (date1: Moment, date2: Moment) =>
  date1.startOf("day").isSame(date2.startOf("day"));

export const isDateInMonth = (date: Moment, month: number) => {
  return date.get("month") === month - 1;
};
export const isDateInTodayMonth = (date: Moment) => {
  return date.get("month") === todayMonth();
};

export const isWeekend = (date: Moment) => {
  return date.isoWeekday() == 6 || date.isoWeekday() == 7;
};
