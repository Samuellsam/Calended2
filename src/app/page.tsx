"use client";

import DayCalendar from "@/components/calendar/day-calendar";
import MonthHeader from "@/components/month-header/month-header";
import { RootState } from "@/lib/store";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { DayCalendarModel, initDayCalendarModel } from "@/types/day-calendar";
import moment from "moment";
import { todayMonth, todayYear } from "@/utils/date-util";

const HomePage: React.FC<{}> = () => {
  const months = useSelector((state: RootState) => state.month.months);
  const selectedMode = useSelector(
    (state: RootState) => state.mode.selectedMode
  );
  const [yearlyCalendar, setYearlyCalendar] = useState<DayCalendarModel[][]>(
    []
  );
  const [monthlyCalendar, setMonthlyCalendar] = useState<DayCalendarModel[]>(
    []
  );

  useEffect(() => {
    if (selectedMode.id === "month") {
      fetchMonthlyCalendar();
    } else if (selectedMode.id === "year") {
      fetchYearlyCalendar();
    }
  }, [selectedMode.id]);

  const fetchMonthlyCalendar = async () => {
    const response = await axios.get("/api/calendar/month", {
      params: {
        month: todayMonth() + 1,
        year: todayYear(),
      },
    });

    setMonthlyCalendar(
      (response.data.calendar as DayCalendarModel[]).map((calendar) => {
        return initDayCalendarModel(calendar);
      })
    );
  };

  const fetchYearlyCalendar = async () => {
    try {
      const response = await axios.get("/api/calendar/year", {
        params: {
          year: todayYear(),
        },
      });

      setYearlyCalendar(
        (response.data.calendar as DayCalendarModel[][]).map(
          (monthCalendar) => {
            return monthCalendar.map((calendar) => {
              return initDayCalendarModel(calendar);
            });
          }
        )
      );
    } catch (error) {}
  };

  const getCalendar = () => {
    if (selectedMode.id === "month") {
      return (
        <Box className="mb-24" key={months[todayMonth()].order}>
          <MonthHeader
            month={months[todayMonth()]}
            key={months[todayMonth()].order}
          />
          {monthlyCalendar && monthlyCalendar.length > 0 ? (
            <div className="grid grid-cols-7 gap-1 text-center">
              {monthlyCalendar.map((c: DayCalendarModel, idx) => (
                <DayCalendar dayCalendar={c} key={idx} />
              ))}
            </div>
          ) : (
            <Typography className="my-5 font-bold font-caveat text-center text-white">
              Loading...
            </Typography>
          )}
        </Box>
      );
    }

    return months.map((m) => (
      <Box className="mb-24" key={m.order}>
        <MonthHeader month={m} key={m.order} />
        {yearlyCalendar && yearlyCalendar.length > 0 ? (
          <div className="grid grid-cols-7 gap-1 text-center">
            {yearlyCalendar[m.order - 1].map((c: DayCalendarModel, idx) => (
              <DayCalendar dayCalendar={c} key={idx} />
            ))}
          </div>
        ) : (
          <Typography className="my-5 font-bold font-caveat text-center text-white">
            Loading...
          </Typography>
        )}
      </Box>
    ));
  };

  return <Box className="pb-1">{getCalendar()}</Box>;
};

export default HomePage;
