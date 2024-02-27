import { Team } from "@/types/team";
import db from "../db";
import moment from "moment";

export class TeamRepository {
  constructor() {}

  read = async (): Promise<Team[]> => {
    await db.read();

    let teams = db.data.teams;

    if (!teams) return [];

    return teams.map((t) => ({
      id: t.id,
      color: t.color,
      name: t.name,
      order: parseInt(t.order),
      members:
        t.members?.map((m) => ({
          id: m.id,
          name: m.name,
          birthday: moment(m.birthday),
        })) ?? [],
    }));
  };

  findAll = async (): Promise<Team[]> => {
    return await this.read();
  };
}
