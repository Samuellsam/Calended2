import { DayCalendarModel } from "@/types/day-calendar";
import {
  isDateInMonth,
  isDateInTodayMonth,
  isToday,
  isWeekend,
  todayMonth,
} from "@/utils/date-util";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import moment from "moment";
import WfoCover from "./wfo-cover";
import TodaySign from "./today-sign";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import { useState } from "react";

const DayCalendar: React.FC<{
  dayCalendar: DayCalendarModel;
  onDetail: (dayCalendar: DayCalendarModel) => void;
}> = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const isOffDay = () => {
    return props.dayCalendar.offDays && props.dayCalendar.offDays.length > 0;
  };

  const getDayClass = () => {
    const defaultClass = "relative rounded-lg m-1 transition-bg";

    if (!isDateInMonth(props.dayCalendar.date, props.dayCalendar.month.order)) {
      return `${defaultClass} bg-slate-200 hover:bg-slate-400 dark:hover:bg-slate-600 dark:bg-slate-800 text-slate-800 dark:text-slate-200`;
    }
    if (isOffDay()) {
      return `${defaultClass} bg-red-800 hover:bg-red-600 text-slate-200`;
    }

    if (isWeekend(props.dayCalendar.date)) {
      return `${defaultClass} bg-slate-300 hover:bg-slate-500 dark:bg-slate-700 text-slate-700 dark:text-slate-300`;
    }

    return defaultClass;
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

      <Typography className="my-2 mx-3 font-bold font-caveat relative text-start">
        {props.dayCalendar.date.get("date")}
      </Typography>

      {isHovered && (
        <FullscreenOutlinedIcon
          className="cursor-pointer absolute right-2 top-2 hover:bg-white hover:text-slate-800 rounded-md"
          onClick={() => props.onDetail(props.dayCalendar)}
        />
      )}
    </Box>
  );
};

export default DayCalendar;
