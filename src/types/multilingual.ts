export type MultilingualType = "id" | "en";

export interface Multilingual {
  id: string;
  en: string;
}

export const initMultilingual = (multilingual: Multilingual): Multilingual => ({
  ...multilingual,
});
