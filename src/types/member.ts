import moment, { Moment } from "moment";

export type Member = {
  id: string;
  name: string;
  birthday: Moment;
};

export const initMember = (member: Member): Member => ({
  ...member,
  birthday: moment(member.birthday),
});
