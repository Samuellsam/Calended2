import OffDayController from "@/controllers/OffDayController";
import { NextRequest } from "next/server";

const offDayController = new OffDayController();

export async function GET(request: NextRequest): Promise<Response> {
  return await offDayController.getAll();
}

export async function POST(request: NextRequest): Promise<Response> {
  return await offDayController.post(request);
}
