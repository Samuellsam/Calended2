import Box from "@mui/material/Box";
import DayInWeekHeader from "./day-in-week-header";
import { Month } from "@/types/month";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { Button, IconButton, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { setMonth } from "@/lib/features/calendar/calendar-slice";
import { blueGrey, grey, yellow } from "@mui/material/colors";

const MonthHeader: React.FC<{
  month: Month;
}> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language.selectedLang);
  const month = useSelector((state: RootState) => state.calendar.month);
  const mode = useSelector((state: RootState) => state.mode.selectedMode);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          component="p"
          className="font-rubik-doodle-shadow"
          sx={{
            fontWeight: "bold",
          }}
        >
          <span
            style={{
              color: yellow[700],
            }}
          >
            {`[' `}
            <span
              style={{
                color: grey[100],
              }}
            >
              {props.month.name[lang.id] &&
                props.month.name[lang.id].toUpperCase()}
            </span>
            {` '];`}
          </span>
        </Typography>

        {mode.id === "month" && (
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              className="prev-month-control"
              sx={{
                marginY: "auto",
                backgroundColor: blueGrey[100],
                color: grey[800],
                ":hover": {
                  backgroundColor: blueGrey[100],
                },
              }}
              onClick={() => dispatch(setMonth({ month: month - 1 }))}
            >
              <ArrowLeftIcon />
            </Button>
            <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
              }}
            ></div>
            <Button
              className="next-month-control"
              sx={{
                marginY: "auto",
                backgroundColor: blueGrey[100],
                color: grey[800],
                ":hover": {
                  backgroundColor: blueGrey[100],
                },
              }}
              onClick={() => dispatch(setMonth({ month: month + 1 }))}
            >
              <ArrowRightIcon />
            </Button>
          </Box>
        )}
      </Box>

      <div
        style={{
          marginTop: "10px",
          marginBottom: "10px",
        }}
      />

      <DayInWeekHeader />
    </Box>
  );
};

export default MonthHeader;
