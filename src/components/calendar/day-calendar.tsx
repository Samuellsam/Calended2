import { DayCalendarModel } from "@/types/day-calendar";
import { isDateInMonth, isToday, isWeekend } from "@/utils/date-util";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import WfoCover from "./wfo-cover";
import TodaySign from "./today-sign";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import Marquee from "./marquee";
import { blueGrey, grey, red } from "@mui/material/colors";

const DayCalendar: React.FC<{
  dayCalendar: DayCalendarModel;
  onDetail: (dayCalendar: DayCalendarModel) => void;
}> = (props) => {
  const isOffDay = () => {
    return props.dayCalendar.offDays && props.dayCalendar.offDays.length > 0;
  };

  const isWorkDay = () => {
    return props.dayCalendar.wfoTeam && props.dayCalendar.wfoTeam.length > 0;
  };

  const getDayClass = () => {
    const defaultClass = {
      position: "relative",
      borderRadius: "5px",
      margin: "2px",
      backgroundColor: blueGrey[800],
      color: grey[100],
    };

    if (!isDateInMonth(props.dayCalendar.date, props.dayCalendar.month.order)) {
      if (isOffDay()) {
        return {
          ...defaultClass,
          backgroundColor: blueGrey[800],
          color: grey[100],
        };
      }

      return {
        ...defaultClass,
        backgroundColor: blueGrey[800],
        color: grey[100],
      };
    }

    if (isWorkDay()) {
      return {
        ...defaultClass,
        backgroundColor: red[800],
        color: grey[800],
      };
    }

    if (isOffDay()) {
      return {
        ...defaultClass,
        backgroundColor: red[800],
        color: grey[100],
      };
    }

    if (isWeekend(props.dayCalendar.date)) {
      return {
        ...defaultClass,
        backgroundColor: blueGrey[500],
        color: grey[100],
      };
    }

    return defaultClass;
  };

  return (
    <Box
      sx={getDayClass()}
      style={{
        aspectRatio: "1/1",
      }}
      className="dark-hover"
    >
      {props.dayCalendar.wfhTeam && (
        <WfoCover
          wfhTeam={props.dayCalendar.wfhTeam}
          wfoTeam={props.dayCalendar.wfoTeam}
          mode={
            isDateInMonth(props.dayCalendar.date, props.dayCalendar.month.order)
              ? "colorful"
              : "dark"
          }
        />
      )}

      {isToday(props.dayCalendar.date) &&
        isDateInMonth(
          props.dayCalendar.date,
          props.dayCalendar.month.order
        ) && <TodaySign />}

      <Typography
        className="font-caveat"
        sx={{
          top: "10px",
          left: "13px",
          fontWeight: "bold",
          position: "relative",
          textAlign: "start",
        }}
      >
        {props.dayCalendar.date.get("date")}
      </Typography>

      {isOffDay() && (
        <Marquee
          id={`marquee-${props.dayCalendar.date.toString()}`}
          text={props.dayCalendar.offDays.map((o) => `${o.name} (${o.type})`)}
        />
      )}

      <FullscreenOutlinedIcon
        className="calendar-detail"
        onClick={() => props.onDetail(props.dayCalendar)}
        sx={{
          cursor: "pointer",
          position: "absolute",
          right: "10px",
          top: "10px",
          borderRadius: "10px",
        }}
      />
    </Box>
  );
};

export default DayCalendar;
