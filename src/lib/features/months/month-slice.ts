import { DEFAULT_MONTHS } from "@/constants/months";
import { Month } from "@/types/month";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  months: Month[];
} = {
  months: DEFAULT_MONTHS,
};

export const monthSlice = createSlice({
  name: "month",
  initialState,
  reducers: {},
});

export default monthSlice.reducer;
