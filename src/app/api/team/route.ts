import TeamController from "@/controllers/TeamController";
import { NextApiRequest } from "next";

const teamController = new TeamController();

export async function GET(request: NextApiRequest): Promise<Response> {
  return await teamController.get();
}
