import { Theme, ThemeType } from "@/types/theme";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const themes: Theme[] = [
  {
    id: "dark",
    name: "dark",
  },
  {
    id: "light",
    name: "light",
  },
];

export const DEFAULT_THEME: Theme = themes.find(
  (t) => t.id === "dark"
) as Theme;

export const THEME_LOCAL_STORAGE_KEY = "calended_theme";

const initialState: {
  selectedTheme: Theme;
} = {
  selectedTheme: DEFAULT_THEME,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      let newThemeId: ThemeType;

      if (state.selectedTheme.id === "dark") {
        newThemeId = "light";
      } else {
        newThemeId = "dark";
      }

      themeSlice.caseReducers.setTheme(state, {
        payload: newThemeId,
        type: "theme/setTheme",
      });
    },
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.selectedTheme = themes.find(
        (t) => t.id === action.payload
      ) as Theme;

      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
