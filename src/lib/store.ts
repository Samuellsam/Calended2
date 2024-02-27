import { configureStore } from "@reduxjs/toolkit";
import monthReducer from "./features/months/month-slice";
import dayReducer from "./features/days/day-slice";
import languageReducer from "./features/languages/language-slice";
import themeReducer from "./features/themes/theme-slice";
import modeReducer from "./features/modes/mode-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      day: dayReducer,
      month: monthReducer,
      language: languageReducer,
      theme: themeReducer,
      mode: modeReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
