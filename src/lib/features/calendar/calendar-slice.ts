import { DayCalendarModel, initDayCalendarModel } from "@/types/day-calendar";
import { todayMonth, todayYear } from "@/utils/date-util";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  yearlyCalendar: DayCalendarModel[][];
  monthlyCalendar: DayCalendarModel[];
  year: number;
  month: number;
  refresh: boolean;
} = {
  yearlyCalendar: [],
  monthlyCalendar: [],
  year: todayYear(),
  month: todayMonth(),
  refresh: false,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setYear: (state, action: PayloadAction<{ year: number }>) => {
      state.year = action.payload.year;
    },
    setMonth: (state, action: PayloadAction<{ month: number }>) => {
      if (action.payload.month >= 0 && action.payload.month < 12) {
        state.month = action.payload.month;
      } else if (action.payload.month >= 12) {
        state.month = 0;
        state.year = state.year + 1;
      } else if (action.payload.month < 0) {
        state.month = 11;
        state.year = state.year - 1;
      }
    },
    clearMonthlyCalendar: (state) => {
      state.monthlyCalendar = [];
    },
    clearYearlyCalendar: (state) => {
      state.yearlyCalendar = [];
    },
    toggleRefresh: (state) => {
      state.refresh = !state.refresh;
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

export const {
  setYear,
  setMonth,
  clearMonthlyCalendar,
  clearYearlyCalendar,
  toggleRefresh,
} = calendarSlice.actions;

export default calendarSlice.reducer;
