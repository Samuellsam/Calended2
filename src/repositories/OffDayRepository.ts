import { OffDay, OffDayType } from "@/types/off-day";
import db from "../db";
import moment from "moment";

export class OffDayRepository {
  constructor() {}

  read = async (): Promise<OffDay[]> => {
    await db.read();

    const offDays = db.data?.offDays;

    if (!offDays) {
      return [];
    }

    return offDays.map((od) => ({
      id: od.id,
      name: od.name,
      from: moment(od.from),
      to: moment(od.to),
      type: od.type as OffDayType,
    }));
  };

  findAll = async (): Promise<OffDay[]> => {
    return await this.read();
  };
}
