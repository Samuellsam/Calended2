import { DayCalendarModel } from "./day-calendar";

export interface CalendarModel {
  0: DayCalendarModel[];
  1: DayCalendarModel[];
  2: DayCalendarModel[];
  3: DayCalendarModel[];
  4: DayCalendarModel[];
  5: DayCalendarModel[];
  6: DayCalendarModel[];
  7: DayCalendarModel[];
  8: DayCalendarModel[];
  9: DayCalendarModel[];
  10: DayCalendarModel[];
  11: DayCalendarModel[];
}

export const dfltCalendarModel = (): CalendarModel => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].reduce(
    (accumulator, value) => ({
      ...accumulator,
      [value]: [],
    }),
    {} as CalendarModel
  );
};
