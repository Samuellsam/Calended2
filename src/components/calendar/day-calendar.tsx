import { DayCalendarModel } from "@/types/day-calendar";
import { isDateInMonth, isToday } from "@/utils/date-util";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import moment from "moment";
import WfoCover from "./wfo-cover";
import TodaySign from "./today-sign";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import { useState } from "react";

const DayCalendar: React.FC<{
  dayCalendar: DayCalendarModel;
}> = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const isOffDay = () => {
    return props.dayCalendar.offDays && props.dayCalendar.offDays.length > 0;
  };

  const getDayClass = () => {
    const defaultClass = "relative rounded-lg m-1 transition-bg";

    if (isOffDay()) {
      return `${defaultClass} bg-red-800 hover:bg-red-600 text-slate-200`;
    }

    if (props.dayCalendar.wfhTeam) {
      return `${defaultClass} text-slate-950`;
    }

    return `${defaultClass} bg-slate-200 hover:bg-slate-400 dark:hover:bg-slate-600 dark:bg-slate-800 text-slate-800 dark:text-slate-200`;
  };

  return (
    <Box
      className={getDayClass()}
      style={{
        aspectRatio: "1/1",
      }}
      onMouseEnter={() => setIsHovered(!isHovered)}
      onMouseLeave={() => setIsHovered(!isHovered)}
    >
      {props.dayCalendar.wfhTeam && (
        <WfoCover
          wfhTeam={props.dayCalendar.wfhTeam}
          wfoTeam={props.dayCalendar.wfoTeam}
        />
      )}

      {isToday(props.dayCalendar.date) &&
        isDateInMonth(
          props.dayCalendar.date,
          props.dayCalendar.month.order
        ) && <TodaySign />}

      <Typography className="my-2 mx-3 font-bold font-caveat relative text-start">
        {props.dayCalendar.date.get("date")}
      </Typography>

      {isHovered && (
        <FullscreenOutlinedIcon
          className="cursor-pointer absolute right-2 top-2 hover:bg-white hover:text-slate-800 rounded-md"
          onClick={() => {}}
        />
      )}
    </Box>
  );
};

export default DayCalendar;
