import { Team } from "@/types/team";
import db from "../db";
import moment from "moment";
import { initMember } from "@/types/member";
import { v4 as uuidv4 } from "uuid";

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
      order: t.order,
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

  insert = async (name: string, color: string): Promise<Boolean> => {
    const teamLength = await this.findAll();

    try {
      await db.update(({ teams }) =>
        teams?.push({
          name: name,
          color: color.toUpperCase(),
          order: teamLength.length,
          members: [],
          id: uuidv4(),
        })
      );

      return true;
    } catch (error) {}

    return false;
  };
}
