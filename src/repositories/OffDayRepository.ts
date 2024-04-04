import { OffDay, OffDayType } from "@/types/off-day";
import db from "../db";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

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

  insert = async (
    newFrom: string,
    newTo: string,
    newName: string,
    newType: string
  ): Promise<Boolean> => {
    try {
      await db.update(({ offDays }) =>
        offDays?.push({
          id: uuidv4(),
          from: newFrom,
          name: newName,
          to: newTo,
          type: newType as string,
        })
      );

      return true;
    } catch (error) {}

    return false;
  };
}
