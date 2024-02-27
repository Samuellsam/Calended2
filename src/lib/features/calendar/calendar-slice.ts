import { CalendarModel, dfltCalendarModel } from "@/types/calendar";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  calendar: CalendarModel;
} = {
  calendar: dfltCalendarModel(),
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    initializeCalendar: (state, action: PayloadAction<number>) => {},
  },
});

export default calendarSlice.reducer;
