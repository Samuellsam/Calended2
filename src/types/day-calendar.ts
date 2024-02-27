import moment, { Moment } from "moment";
import { OffDay, initOffDay } from "./off-day";
import { Team, initTeam } from "./team";
import { Month, initMonth } from "./month";

export interface DayCalendarModel {
  date: Moment;
  offDays: Array<OffDay>;
  wfhTeam: Team | null;
  wfoTeam: Array<Team>;
  month: Month;
}

export const initDayCalendarModel = (
  dayCalendarModel: DayCalendarModel
): DayCalendarModel => ({
  ...dayCalendarModel,
  date: moment(dayCalendarModel.date),
  offDays: dayCalendarModel.offDays.map((o) => initOffDay(o)),
  wfhTeam: dayCalendarModel.wfhTeam ? initTeam(dayCalendarModel.wfhTeam) : null,
  wfoTeam: dayCalendarModel.wfoTeam.map((t) => initTeam(t)),
  month: initMonth(dayCalendarModel.month),
});
