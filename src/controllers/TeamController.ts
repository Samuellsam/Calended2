import { BaseDateRepository } from "@/repositories/BaseDateRepository";
import { TeamRepository } from "@/repositories/TeamRepository";
import { NextRequest } from "next/server";

export default class TeamController {
  private teamRepository: TeamRepository;

  constructor() {
    this.teamRepository = new TeamRepository();
  }

  public get = async (): Promise<Response> => {
    try {
      const data = await this.teamRepository.findAll();

      return Response.json({
        teams: data,
      });
    } catch (e) {
      return Response.json({ status: "error", message: e });
    }
  };

  public post = async (req: NextRequest): Promise<Response> => {
    try {
      const data = await req.json();
      const existingTeams = await this.teamRepository.findAll();

      const sameColorTeam = existingTeams.find((t) => t.color == data.color);
      if (sameColorTeam) {
        return Response.json(
          {
            status: "error",
            message: "Team with same color already exists",
          },
          { status: 404 }
        );
      }

      const sameNameTeam = existingTeams.find((t) => t.name == data.name);
      if (sameNameTeam) {
        console.log("ok");
        return Response.json(
          {
            status: "error",
            message: "Team with same name already exists",
          },
          { status: 404 }
        );
      }

      this.teamRepository.insert(data.name, data.color);

      return Response.json({
        success: true,
      });
    } catch (e) {
      return Response.json({ status: "error", message: e });
    }
  };
}
