import { DEFAULT_MONTHS } from "@/constants/months";
import { BaseDate } from "@/types/base-date";
import { DayCalendarModel } from "@/types/day-calendar";
import { OffDay } from "@/types/off-day";
import { Team } from "@/types/team";
import { firstDayOfMonth, isWeekend, lastDayOfMonth } from "@/utils/date-util";
import moment, { Moment } from "moment";

export class CalendarRepository {
  constructor() {}

  getTeamByOrder = (teams: Team[], order: number): Team => {
    return teams.find((t) => t.order === order) as Team;
  };

  getNextWfhTeam = (teams: Team[], wfhTeam: Team): Team => {
    if (wfhTeam.order === teams.length - 1) {
      return this.getTeamByOrder(teams, 0);
    }

    return this.getTeamByOrder(teams, wfhTeam.order + 1);
  };

  getTeamById = (teams: Team[], id: string): Team => {
    return teams.find((t) => t.id === id) as Team;
  };

  getHolidaysByDate = (holidays: OffDay[], date: Moment) => {
    return holidays.filter((holiday) =>
      date.isBetween(holiday.from, holiday.to, "days", "[]")
    );
  };

  isOffDayDate = (offDays: OffDay[], date: Moment) => {
    const holidays = this.getHolidaysByDate(offDays, date);

    return holidays && holidays.length > 0;
  };

  getWfoTeam = (teams: Team[], wfhTeam: Team): Team[] => {
    const wfoTeam: Team[] = [];
    let currWfhTeam = wfhTeam;

    do {
      currWfhTeam = this.getNextWfhTeam(teams, currWfhTeam);

      wfoTeam.push(currWfhTeam);
    } while (wfoTeam.length < teams.length - 1);

    return wfoTeam;
  };

  generateYearCalendar = (
    baseDate: BaseDate,
    offDays: OffDay[],
    teams: Team[],
    year: number
  ) => {
    const yearCalendar: DayCalendarModel[][] = Array(12).fill([]);

    for (let month = 1; month <= 12; month++) {
      yearCalendar[month - 1] = this.generateMonthCalendar(
        baseDate,
        offDays,
        teams,
        month,
        year
      );
    }

    return yearCalendar;
  };

  generateMonthCalendar = (
    baseDate: BaseDate,
    offDays: OffDay[],
    teams: Team[],
    month: number,
    year: number
  ) => {
    const monthCalendar: DayCalendarModel[] = [];

    // generate calendar from first day of month until H-1 base date
    let firstDayMonth: Moment = firstDayOfMonth(month, year);
    let lastDayMonth: Moment = lastDayOfMonth(month, year);
    let currDate: Moment = moment(firstDayMonth);

    while (currDate.isBefore(baseDate.date, "date")) {
      if (
        currDate.isSameOrAfter(firstDayMonth, "date") &&
        currDate.isSameOrBefore(lastDayMonth, "date")
      ) {
        // push default calendar model
        monthCalendar.push({
          date: moment(currDate),
          offDays: this.getHolidaysByDate(offDays, currDate),
          wfhTeam: null,
          wfoTeam: [],
          month: DEFAULT_MONTHS[month - 1],
        });
      }

      // increment days
      currDate.add(1, "days");
    }

    // generate calendar from base date until last day of year
    let currWfhTeam: Team = this.getTeamById(teams, baseDate.wfhTeamId);
    currDate = moment(baseDate.date);

    while (currDate.isSameOrBefore(lastDayMonth, "date")) {
      const currCalendar: DayCalendarModel = {
        date: moment(currDate),
        offDays: this.getHolidaysByDate(offDays, currDate),
        wfhTeam: null,
        wfoTeam: [],
        month: DEFAULT_MONTHS[month - 1],
      };

      if (currDate.isSame(baseDate.date, "date")) {
        currCalendar.wfhTeam = currWfhTeam;
        currCalendar.wfoTeam = this.getWfoTeam(teams, currWfhTeam);
      }
      // if not weekend, not off day and after base date, get next wfh team
      else if (
        currDate.isAfter(baseDate.date, "date") &&
        !this.isOffDayDate(offDays, currDate) &&
        !isWeekend(currDate)
      ) {
        currWfhTeam = this.getNextWfhTeam(teams, currWfhTeam);
        currCalendar.wfhTeam = currWfhTeam;
        currCalendar.wfoTeam = this.getWfoTeam(teams, currWfhTeam);
      }

      if (
        currDate.isSameOrAfter(firstDayMonth, "date") &&
        currDate.isSameOrBefore(lastDayMonth, "date")
      ) {
        monthCalendar.push(currCalendar);
      }

      // increment date
      currDate.add(1, "days");
    }

    return monthCalendar;
  };
}
