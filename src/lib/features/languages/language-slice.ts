import { Language } from "@/types/language";
import { MultilingualType } from "@/types/multilingual";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const languages: Language[] = [
  {
    id: "id" as MultilingualType,
    name: { id: "indonesia", en: "indonesian" },
    abbreviation: "id",
  },
  {
    id: "en" as MultilingualType,
    name: { id: "inggris", en: "english" },
    abbreviation: "en",
  },
];

export const DEFAULT_LANG: Language = languages.find(
  (l) => l.id === "en"
) as Language;

export const LANG_LOCAL_STORAGE_KEY = "calended_lang";

const initialState: {
  selectedLang: Language;
  languages: Language[];
} = {
  selectedLang: DEFAULT_LANG,
  languages,
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLang: (state) => {
      let newLangId: MultilingualType;

      if (state.selectedLang.id === "id") {
        newLangId = "en";
      } else {
        newLangId = "id";
      }

      languageSlice.caseReducers.setLang(state, {
        payload: newLangId,
        type: "language/setLang",
      });
    },
    setLang: (state, action: PayloadAction<MultilingualType>) => {
      state.selectedLang = languages.find(
        (l) => l.id === action.payload
      ) as Language;

      localStorage.setItem(LANG_LOCAL_STORAGE_KEY, action.payload);
    },
  },
});

export const { toggleLang, setLang } = languageSlice.actions;

export default languageSlice.reducer;
