import { BaseDateRepository } from "@/repositories/BaseDateRepository";
import { CalendarRepository } from "@/repositories/CalendarRepository";
import { OffDayRepository } from "@/repositories/OffDayRepository";
import { TeamRepository } from "@/repositories/TeamRepository";
import { DayCalendarModel } from "@/types/day-calendar";
import { Month } from "@/types/month";

export default class CalendarController {
  private calendarRepository: CalendarRepository;
  private baseDateRepository: BaseDateRepository;
  private teamRepository: TeamRepository;
  private offDayRepository: OffDayRepository;

  constructor() {
    this.calendarRepository = new CalendarRepository();
    this.baseDateRepository = new BaseDateRepository();
    this.teamRepository = new TeamRepository();
    this.offDayRepository = new OffDayRepository();
  }

  public getYearCalendar = async (year: number): Promise<Response> => {
    const baseDate = await this.baseDateRepository.find();
    const teams = await this.teamRepository.findAll();
    const offDays = await this.offDayRepository.findAll();

    let calendar: DayCalendarModel[][] = [];

    if (baseDate) {
      calendar = this.calendarRepository.generateYearCalendar(
        baseDate,
        offDays,
        teams,
        year
      );
    }

    try {
      return Response.json({ calendar });
    } catch (e) {
      return Response.json({ status: "error", message: e });
    }
  };

  public getMonthCalendar = async (
    month: number,
    year: number
  ): Promise<Response> => {
    const baseDate = await this.baseDateRepository.find();
    const teams = await this.teamRepository.findAll();
    const offDays = await this.offDayRepository.findAll();

    let calendar: DayCalendarModel[] = [];

    try {
      if (baseDate) {
        calendar = this.calendarRepository.generateMonthCalendar(
          baseDate,
          offDays,
          teams,
          month,
          year
        );
      }

      return Response.json({ calendar });
    } catch (e) {
      return Response.json({ status: "error", message: e });
    }
  };
}
