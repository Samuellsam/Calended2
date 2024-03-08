import { DayCalendarModel, initDayCalendarModel } from "@/types/day-calendar";
import { Team, initTeam } from "@/types/team";
import { todayMonth, todayYear } from "@/utils/date-util";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  teams: Team[];
} = {
  teams: [],
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeam.fulfilled, (state, action) => {
      state.teams = (action.payload.teams as Team[]).map((t) => {
        return initTeam(t);
      });
    });
  },
});

export const fetchTeam = createAsyncThunk("team/fetchTeam", async () => {
  const response = await axios.get("/api/team");

  return response.data;
});

export default teamSlice.reducer;
