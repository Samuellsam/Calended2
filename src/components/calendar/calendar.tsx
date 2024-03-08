"use client";

import DayCalendar from "@/components/calendar/day-calendar";
import MonthHeader from "@/components/month-header/month-header";
import { AppDispatch, RootState } from "@/lib/store";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DayCalendarModel, initDayCalendarModel } from "@/types/day-calendar";
import { isWeekend, todayMonth, todayYear } from "@/utils/date-util";
import OffDayListItem from "../off-day/off-day-list-item";
import {
  clearMonthlyCalendar,
  clearYearlyCalendar,
  fetchMonthlyCalendar,
  fetchYearlyCalendar,
} from "@/lib/features/calendar/calendar-slice";
import TeamListItem from "../team/team-list-item";
import { blueGrey, grey } from "@mui/material/colors";

const Calendar: React.FC<{}> = () => {
  const theme = useSelector((state: RootState) => state.theme.selectedTheme);
  const dispatch: AppDispatch = useDispatch();

  const selectedMode = useSelector(
    (state: RootState) => state.mode.selectedMode
  );
  const months = useSelector((state: RootState) => state.month.months);

  const year = useSelector((state: RootState) => state.calendar.year);
  const month = useSelector((state: RootState) => state.calendar.month);

  const yearlyCalendar = useSelector(
    (state: RootState) => state.calendar.yearlyCalendar
  );
  const monthlyCalendar = useSelector(
    (state: RootState) => state.calendar.monthlyCalendar
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCalendar, setSelectedCalendar] = useState<DayCalendarModel>();

  useEffect(() => {
    dispatch(clearMonthlyCalendar());
    dispatch(clearYearlyCalendar());
    dispatch(fetchMonthlyCalendar({ month: month + 1, year }));
    dispatch(fetchYearlyCalendar({ year }));
  }, [year, month]);

  const getCalendar = () => {
    if (selectedMode.id === "month") {
      return (
        <Box
          sx={{
            marginBottom: "120px",
          }}
          key={months[todayMonth()].order}
        >
          <MonthHeader month={months[month]} key={months[month].order} />
          {monthlyCalendar && monthlyCalendar.length > 0 ? (
            <Grid container spacing={1}>
              {monthlyCalendar.map((c: DayCalendarModel, idx) => (
                <Grid item xs={1.7} key={idx}>
                  <DayCalendar dayCalendar={c} onDetail={openDetailCalendar} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              className="font-caveat"
              sx={{
                marginY: "25px",
                fontWeight: "bold",
                textAlign: "center",
                color: grey[100],
              }}
            >
              Loading...
            </Typography>
          )}
        </Box>
      );
    }

    return months.map((m) => (
      <Box
        sx={{
          marginBottom: "120px",
        }}
        key={m.order}
      >
        <MonthHeader month={m} key={m.order} />
        {yearlyCalendar && yearlyCalendar.length > 0 ? (
          <Grid container spacing={1}>
            {yearlyCalendar[m.order - 1].map((c: DayCalendarModel, idx) => (
              <Grid item xs={1.7} key={idx}>
                <DayCalendar dayCalendar={c} onDetail={openDetailCalendar} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            className="font-caveat"
            sx={{
              marginY: "25px",
              fontWeight: "bold",
              textAlign: "center",
              color: grey[100],
            }}
          >
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
    let dayType = "Work Day 💻";

    if (isOffDay()) {
      dayType = "Off Day 🎉";
    }

    if (
      selectedCalendar &&
      selectedCalendar.date &&
      isWeekend(selectedCalendar.date)
    ) {
      dayType = "Weekend 🎠";
    }

    return `${selectedCalendar?.date.format(
      "dddd, MMMM Do YYYY"
    )} - ${dayType}`;
  };

  const getDetail = () => {
    if (!selectedCalendar) return <></>;

    if (isOffDay()) {
      return selectedCalendar.offDays.map((h) => (
        <OffDayListItem offDay={h} key={h.id}></OffDayListItem>
      ));
    }

    if (isWorkDay()) {
      return (
        <>
          <p
            style={{
              fontWeight: "bold",
            }}
          >
            Work From Office
          </p>
          {selectedCalendar.wfoTeam.map((t) => (
            <TeamListItem
              team={t}
              key={`${t.id}-${selectedCalendar.date}`}
            ></TeamListItem>
          ))}
          <br />
          {selectedCalendar.wfhTeam && (
            <>
              <p
                style={{
                  fontWeight: "bold",
                }}
              >
                Work From Home
              </p>
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
          className={`font-caveat transition-bg`}
          style={{
            fontSize: "3em",
            textAlign: "center",
            margin: "auto",
            paddingTop: "20px",
            paddingBottom: "20px",
            width: "100%",
            color: grey[100],
          }}
        >
          Happy Weekend!! ✨
        </p>
      );
    }
  };

  return (
    <Box
      sx={{
        paddingBottom: "5px",
      }}
    >
      {getCalendar()}
      <Dialog open={isOpen} keepMounted onClose={() => setIsOpen(false)}>
        <DialogTitle
          className="font-caveat"
          style={{ width: "500px" }}
          sx={{
            fontWeight: "bold",
            backgroundColor: blueGrey[800],
            color: grey[100],
          }}
        >
          {getTitle()}
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "25px",
            backgroundColor: blueGrey[700],
            color: grey[200],
          }}
        >
          <DialogContentText color={"inherit"}>{getDetail()}</DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Calendar;
