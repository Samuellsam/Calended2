import { Member, initMember } from "./member";

export type Team = {
  id: string;
  name: string;
  members: Member[];
  order: number;
  color: string;
};

export const initTeam = (team: Team): Team => ({
  ...team,
  members: team.members.map((m) => initMember(m)),
});
