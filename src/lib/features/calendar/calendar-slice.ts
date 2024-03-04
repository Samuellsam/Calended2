import { CalendarModel, dfltCalendarModel } from "@/types/calendar";
import { DayCalendarModel, initDayCalendarModel } from "@/types/day-calendar";
import { todayMonth, todayYear } from "@/utils/date-util";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  yearlyCalendar: DayCalendarModel[][];
  monthlyCalendar: DayCalendarModel[];
  year: number;
  month: number;
} = {
  yearlyCalendar: [],
  monthlyCalendar: [],
  year: todayYear(),
  month: todayMonth(),
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setYear: (state, action: PayloadAction<{ year: number }>) => {
      state.year = action.payload.year;
    },
    setMonth: (state, action: PayloadAction<{ month: number }>) => {
      state.month = action.payload.month;
    },
    clearMonthlyCalendar: (state) => {
      state.monthlyCalendar = [];
    },
    clearYearlyCalendar: (state) => {
      state.yearlyCalendar = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchYearlyCalendar.fulfilled, (state, action) => {
      state.yearlyCalendar = (
        action.payload.calendar as DayCalendarModel[][]
      ).map((monthCalendar) => {
        return monthCalendar.map((calendar) => {
          return initDayCalendarModel(calendar);
        });
      });
    });
    builder.addCase(fetchMonthlyCalendar.fulfilled, (state, action) => {
      state.monthlyCalendar = (
        action.payload.calendar as DayCalendarModel[]
      ).map((calendar) => {
        return initDayCalendarModel(calendar);
      });
    });
  },
});

export const fetchMonthlyCalendar = createAsyncThunk(
  "calendar/fetchMonthlyCalendar",
  async ({ month, year }: { month: number; year: number }) => {
    const response = await axios.get("/api/calendar/month", {
      params: {
        month,
        year,
      },
    });

    return response.data;
  }
);

export const fetchYearlyCalendar = createAsyncThunk(
  "calendar/fetchYearlyCalendar",
  async ({ year }: { year: number }) => {
    const response = await axios.get("/api/calendar/year", {
      params: {
        year,
      },
    });

    return response.data;
  }
);

export const { setYear, setMonth, clearMonthlyCalendar, clearYearlyCalendar } =
  calendarSlice.actions;

export default calendarSlice.reducer;
