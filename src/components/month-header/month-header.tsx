import Box from "@mui/material/Box";
import DayInWeekHeader from "./day-in-week-header";
import { Month } from "@/types/month";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { Button, IconButton, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
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
            <KeyboardDoubleArrowLeftIcon
              className="prev-month-control"
              sx={{
                marginY: "auto",
                color: yellow[600],
                cursor: "pointer",
              }}
              onClick={() => dispatch(setMonth({ month: month - 1 }))}
            ></KeyboardDoubleArrowLeftIcon>
            <div
              style={{
                marginLeft: "10px",
                marginRight: "10px",
              }}
            ></div>
            <KeyboardDoubleArrowRightIcon
              className="next-month-control"
              sx={{
                marginY: "auto",
                color: yellow[600],
                cursor: "pointer",
              }}
              onClick={() => dispatch(setMonth({ month: month + 1 }))}
            ></KeyboardDoubleArrowRightIcon>
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
