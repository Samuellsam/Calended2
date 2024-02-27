import { Multilingual, initMultilingual } from "./multilingual";

export interface Month {
  name: Multilingual;
  order: number;
}

export const initMonth = (month: Month): Month => ({
  ...month,
  name: initMultilingual(month.name),
});
