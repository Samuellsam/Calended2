import CalendarController from "@/controllers/CalendarController";
import { NextApiRequest } from "next";

const calendarController = new CalendarController();

export async function GET(request: NextApiRequest): Promise<Response> {
  const { searchParams } = new URL(request.url as string);

  const yearParam = searchParams.get("year");

  if (!yearParam) {
    throw new Error("year param is mandatory");
  }

  return await calendarController.getYearCalendar(parseInt(yearParam));
}
