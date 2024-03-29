import CalendarController from "@/controllers/CalendarController";
import { NextRequest } from "next/server";

const calendarController = new CalendarController();

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url as string);

  const monthParam = searchParams.get("month");
  const yearParam = searchParams.get("year");

  if (!monthParam) {
    throw new Error("month param is mandatory");
  }

  if (!yearParam) {
    throw new Error("year param is mandatory");
  }

  return await calendarController.getMonthCalendar(
    parseInt(monthParam),
    parseInt(yearParam)
  );
}
