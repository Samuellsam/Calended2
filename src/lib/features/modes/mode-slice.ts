import { Mode, ModeType } from "@/types/mode";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const modes: Mode[] = [
  {
    id: "month",
    name: "month",
  },
  {
    id: "year",
    name: "year",
  },
];

export const DEFAULT_MODE: Mode = modes.find((m) => m.id === "month") as Mode;

export const MODE_LOCAL_STORAGE_KEY = "calended_mode";

const initialState: {
  selectedMode: Mode;
} = {
  selectedMode: DEFAULT_MODE,
};

export const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    toggleMode: (state) => {
      let newModeId: ModeType;

      if (state.selectedMode.id === "month") {
        newModeId = "year";
      } else {
        newModeId = "month";
      }

      modeSlice.caseReducers.setMode(state, {
        payload: newModeId,
        type: "theme/setMode",
      });
    },
    setMode: (state, action: PayloadAction<ModeType>) => {
      state.selectedMode = modes.find((m) => m.id === action.payload) as Mode;

      localStorage.setItem(MODE_LOCAL_STORAGE_KEY, action.payload);
    },
  },
});

export const { toggleMode, setMode } = modeSlice.actions;

export default modeSlice.reducer;
