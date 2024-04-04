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
          { status: 400 }
        );
      }

      const sameNameTeam = existingTeams.find((t) => t.name == data.name);
      if (sameNameTeam) {
        return Response.json(
          {
            status: "error",
            message: "Team with same name already exists",
          },
          { status: 400 }
        );
      }

      await this.teamRepository.insert(data.name, data.color);

      return Response.json({
        success: true,
      });
    } catch (e) {
      return Response.json({ status: "error", message: e });
    }
  };

  public postMember = async (req: NextRequest): Promise<Response> => {
    try {
      const data = await req.json();
      const existingTeams = await this.teamRepository.findAll();

      const sameNameMember = existingTeams.find((t) =>
        t.members.find((m) => m.name === data.name)
      );
      if (sameNameMember) {
        return Response.json(
          {
            status: "error",
            message: "Member with same name already exists",
          },
          { status: 400 }
        );
      }

      await this.teamRepository.addMember(
        data.teamId,
        data.name,
        data.birthday
      );

      return Response.json({
        success: true,
      });
    } catch (e) {
      return Response.json({ status: "error", message: e });
    }
  };
}
