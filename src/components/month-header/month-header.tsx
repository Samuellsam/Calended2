import Box from "@mui/material/Box";
import DayInWeekHeader from "./day-in-week-header";
import { Month } from "@/types/month";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Typography } from "@mui/material";

const MonthHeader: React.FC<{
  month: Month;
}> = (props) => {
  const lang = useSelector((state: RootState) => state.language.selectedLang);

  return (
    <Box>
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

      <div className="my-2" />

      <DayInWeekHeader />
    </Box>
  );
};

export default MonthHeader;
