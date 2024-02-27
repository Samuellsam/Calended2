import OffDayController from "@/controllers/OffDayController";
import { NextApiRequest } from "next";

const offDayController = new OffDayController();

export async function GET(request: NextApiRequest): Promise<Response> {
  return await offDayController.getAll();
}
