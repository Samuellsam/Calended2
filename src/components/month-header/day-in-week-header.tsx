import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const DayInWeekHeader: React.FC = () => {
  const lang = useSelector((state: RootState) => state.language.selectedLang);
  const daysInWeek = useSelector((state: RootState) => state.day.daysInWeek);

  return (
    <>
      <div className="grid grid-cols-7 gap-1">
        {daysInWeek.map((d) => (
          <Typography
            component="span"
            className="font-bold px-2 font-rubik-doodle-shadow text-slate-900 dark:text-slate-100"
            key={d.order}
          >
            {d.abbreviation[lang.id] && d.abbreviation[lang.id].toUpperCase()}
          </Typography>
        ))}
      </div>
      <hr className="border border-slate-900 dark:border-slate-100" />
    </>
  );
};

export default DayInWeekHeader;
