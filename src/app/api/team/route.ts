import TeamController from "@/controllers/TeamController";
import { NextRequest } from "next/server";

const teamController = new TeamController();

export async function GET(request: NextRequest): Promise<Response> {
  return await teamController.get();
}
