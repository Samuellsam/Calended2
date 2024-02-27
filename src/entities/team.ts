import { Member } from "./member";

export type Team = {
  id: string;
  name: string;
  members?: Member[];
  order: string;
  color: string;
};
