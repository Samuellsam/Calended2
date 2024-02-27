import { BaseDate } from "@/types/base-date";
import db from "../db";
import moment from "moment";

export class BaseDateRepository {
  constructor() {}

  read = async (): Promise<BaseDate | null> => {
    await db.read();

    const baseDate = db.data.baseDate;

    if (!baseDate) return null;

    return {
      date: moment(baseDate.date),
      wfhTeamId: baseDate.wfhTeamId as string,
    };
  };

  find = async (): Promise<BaseDate | null> => {
    return await this.read();
  };
}
