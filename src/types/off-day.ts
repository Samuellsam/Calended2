import moment, { Moment } from "moment";

export type OffDayType = "mass_leave" | "holiday";

export type OffDay = {
  id: string;
  name: string;
  from: Moment;
  to: Moment;
  type: OffDayType;
};

export const initOffDay = (offDay: OffDay): OffDay => ({
  ...offDay,
  from: moment(offDay.from),
  to: moment(offDay.to),
});
