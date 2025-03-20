import { DayCalendarModel } from "@/types/day-calendar";
import { isDateInMonth, isToday, isWeekend } from "@/utils/date-util";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import WfoCover from "./wfo-cover";
import TodaySign from "./today-sign";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import Marquee from "./marquee";
import { blueGrey, grey, red } from "@mui/material/colors";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

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

  const getMobileDayClass = () => {
    const dflt = {
      aspectRatio: "1/1",
      bgcolor: blueGrey[800],
      border: isDateInMonth(
        props.dayCalendar.date,
        props.dayCalendar.month.order
      )
        ? `3px solid ${grey[500]}`
        : "",
      borderBottom: isToday(props.dayCalendar.date)
        ? "7px solid yellow"
        : `7px solid white`,
      borderRight: isDateInMonth(
        props.dayCalendar.date,
        props.dayCalendar.month.order
      )
        ? `3px solid ${isToday(props.dayCalendar.date) ? "yellow" : "white"}`
        : ``,
      borderRadius: "5px",
      display: "flex",
    };

    if (!isDateInMonth(props.dayCalendar.date, props.dayCalendar.month.order)) {
      if (isOffDay()) {
        return {
          ...dflt,
          bgcolor: blueGrey[800],
          borderBottom: "",
        };
      }

      return {
        ...dflt,
        borderBottom: "",
        bgcolor: blueGrey[800],
      };
    }

    if (isWorkDay()) {
      return {
        ...dflt,
        bgcolor: props.dayCalendar.wfhTeam?.color,
      };
    }

    if (isOffDay()) {
      return {
        ...dflt,
        color: grey[100],
        bgcolor: red[800],
      };
    }

    if (isWeekend(props.dayCalendar.date)) {
      return {
        ...dflt,
        color: grey[100],
        bgcolor: blueGrey[500],
      };
    }

    return dflt;
  };

  return (
    <>
      <BrowserView>
        <Box
          sx={getDayClass()}
          style={{
            aspectRatio: "1/1",
            maxWidth: "200px",
          }}
          className="dark-hover"
        >
          {props.dayCalendar.wfhTeam && (
            <WfoCover
              wfhTeam={props.dayCalendar.wfhTeam}
              wfoTeam={props.dayCalendar.wfoTeam}
              mode={
                isDateInMonth(
                  props.dayCalendar.date,
                  props.dayCalendar.month.order
                )
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
              text={props.dayCalendar.offDays.map(
                (o) => `${o.name} (${o.type})`
              )}
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
      </BrowserView>
      <MobileView>
        <Box
          sx={getMobileDayClass()}
          onClick={() => props.onDetail(props.dayCalendar)}
        >
          {isToday(props.dayCalendar.date) && <div id="today-sign"></div>}
          <Typography
            className="font-caveat"
            variant="subtitle1"
            sx={{
              fontFamily: "monospace",
              width: "min-content",
              fontWeight: "bold",
              margin: "auto",
            }}
          >
            {props.dayCalendar.date.get("date")}
          </Typography>
        </Box>
      </MobileView>
    </>
  );
};

export default DayCalendar;
