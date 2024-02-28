"use client";

import DayCalendar from "@/components/calendar/day-calendar";
import MonthHeader from "@/components/month-header/month-header";
import { RootState } from "@/lib/store";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { DayCalendarModel, initDayCalendarModel } from "@/types/day-calendar";
import { isWeekend, todayMonth, todayYear } from "@/utils/date-util";
import TeamListItem from "../team/TeamListItem";
import OffDayListTeam from "../off-day/OffDayListItem";

const Calendar: React.FC<{}> = () => {
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCalendar, setSelectedCalendar] = useState<DayCalendarModel>();

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
                <DayCalendar
                  dayCalendar={c}
                  key={idx}
                  onDetail={openDetailCalendar}
                />
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
              <DayCalendar
                dayCalendar={c}
                key={idx}
                onDetail={openDetailCalendar}
              />
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

  const openDetailCalendar = (dayCalendar: DayCalendarModel) => {
    setIsOpen(true);
    setSelectedCalendar(dayCalendar);
  };

  const isOffDay = () => {
    return selectedCalendar?.offDays && selectedCalendar?.offDays.length > 0;
  };

  const isWorkDay = () => {
    return selectedCalendar?.wfoTeam && selectedCalendar?.wfoTeam.length > 0;
  };

  const getTitle = () => {
    let dayType = "Weekend 🎠";

    if (isOffDay()) {
      dayType = "Off Day 🎉";
    }

    if (isWorkDay()) {
      dayType = "Work Day 💻";
    }

    return `${selectedCalendar?.date.format(
      "dddd, MMMM Do YYYY"
    )} - ${dayType}`;
  };

  const getDetail = () => {
    if (!selectedCalendar) return <></>;

    if (isOffDay()) {
      return selectedCalendar.offDays.map((h) => (
        <OffDayListTeam offDay={h} key={h.id}></OffDayListTeam>
      ));
    }

    if (isWorkDay()) {
      return (
        <>
          <p className="font-bold">Work From Office</p>
          {selectedCalendar.wfoTeam.map((t) => (
            <TeamListItem
              team={t}
              key={`${t.id}-${selectedCalendar.date}`}
            ></TeamListItem>
          ))}
          <br />
          {selectedCalendar.wfhTeam && (
            <>
              <p className="font-bold">Work From Home</p>
              <TeamListItem
                team={selectedCalendar.wfhTeam}
                key={`${selectedCalendar.wfhTeam.id}-${selectedCalendar.date}`}
              ></TeamListItem>
            </>
          )}
        </>
      );
    }

    if (isWeekend(selectedCalendar.date)) {
      return (
        <p
          className={`font-caveat text-5xl text-center m-auto p-5 w-full transition-bg text-slate-800`}
        >
          Happy Weekend!! ✨
        </p>
      );
    }
  };

  return (
    <Box className="pb-1">
      {getCalendar()}
      <Dialog open={isOpen} keepMounted onClose={() => setIsOpen(false)}>
        <DialogTitle
          className="font-bold bg-slate-200"
          style={{ width: "500px" }}
        >
          {getTitle()}
        </DialogTitle>
        <DialogContent className="p-5">
          <DialogContentText>{getDetail()}</DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Calendar;
