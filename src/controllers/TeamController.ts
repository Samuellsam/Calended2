import { BaseDateRepository } from "@/repositories/BaseDateRepository";
import { TeamRepository } from "@/repositories/TeamRepository";

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
}
