import { DayInWeek } from "@/types/day";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  daysInWeek: DayInWeek[];
} = {
  daysInWeek: [
    {
      name: { id: "minggu", en: "sunday" },
      abbreviation: { id: "min", en: "sun" },
      order: 1,
    },
    {
      name: { id: "senin", en: "monday" },
      abbreviation: { id: "sen", en: "mon" },
      order: 2,
    },
    {
      name: { id: "selasa", en: "tuesday" },
      abbreviation: { id: "sel", en: "tue" },
      order: 3,
    },
    {
      name: { id: "rabu", en: "wednesday" },
      abbreviation: { id: "rab", en: "wed" },
      order: 4,
    },
    {
      name: { id: "kamis", en: "thursday" },
      abbreviation: { id: "kam", en: "thu" },
      order: 5,
    },
    {
      name: { id: "jumat", en: "friday" },
      abbreviation: { id: "jum", en: "fri" },
      order: 6,
    },
    {
      name: { id: "sabtu", en: "saturday" },
      abbreviation: { id: "sab", en: "sat" },
      order: 7,
    },
  ],
};

export const daySlice = createSlice({
  name: "day",
  initialState,
  reducers: {},
});

export default daySlice.reducer;
