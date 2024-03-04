import Box from "@mui/material/Box";
import DayInWeekHeader from "./day-in-week-header";
import { Month } from "@/types/month";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { Button, IconButton, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { setMonth } from "@/lib/features/calendar/calendar-slice";

const MonthHeader: React.FC<{
  month: Month;
}> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language.selectedLang);
  const month = useSelector((state: RootState) => state.calendar.month);
  const mode = useSelector((state: RootState) => state.mode.selectedMode);

  return (
    <Box>
      <Box className="flex justify-between">
        <Typography
          variant="h6"
          component="p"
          className="font-bold font-rubik-doodle-shadow"
        >
          <span className="text-red-700 dark:text-yellow-500">
            {`[' `}
            <span className="text-slate-900 dark:text-slate-100">
              {props.month.name[lang.id] &&
                props.month.name[lang.id].toUpperCase()}
            </span>
            {` '];`}
          </span>
        </Typography>

        {mode.id === "month" && (
          <Box className="flex">
            <Button className="my-auto bg-slate-200 text-slate-800 w-min" onClick={() => dispatch(setMonth({ month: month - 1 }))}>
              <ArrowLeftIcon />
            </Button>
            <div className="mx-1"></div>
            <Button className="my-auto bg-slate-200 text-slate-800 w-min" onClick={() => dispatch(setMonth({ month: month + 1 }))}>
              <ArrowRightIcon />
            </Button>
          </Box>
        )}
      </Box>

      <div className="my-2" />

      <DayInWeekHeader />
    </Box>
  );
};

export default MonthHeader;
