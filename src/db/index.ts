import { Low } from "lowdb";
import { BaseDate } from "@/entities/base-date";
import { JSONFile } from "lowdb/node";
import { DB_PATH } from "@/constants/db-path";
import { Team } from "@/entities/team";
import { OffDay } from "@/entities/off-day";

export type Tables = {
  baseDate?: BaseDate;
  offDays?: OffDay[];
  teams?: Team[];
};

const adapter = new JSONFile<Tables>(DB_PATH);
const db = new Low(adapter, {});

export default db;
