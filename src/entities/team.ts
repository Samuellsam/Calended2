import { Member } from "./member";

export type Team = {
  id: string;
  name: string;
  members?: Member[];
  order: number;
  color: string;
};
