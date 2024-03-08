import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";

const DayInWeekHeader: React.FC = () => {
  const lang = useSelector((state: RootState) => state.language.selectedLang);
  const daysInWeek = useSelector((state: RootState) => state.day.daysInWeek);

  return (
    <>
      <Grid container spacing={1}>
        {daysInWeek.map((d) => (
          <Grid item xs={1.7} key={d.order}>
            <Typography
              component="span"
              className="font-rubik-doodle-shadow"
              sx={{
                fontWeight: "bold",
                paddingX: "10px",
                color: grey[100],
              }}
            >
              {d.abbreviation[lang.id] && d.abbreviation[lang.id].toUpperCase()}
            </Typography>
          </Grid>
        ))}
        <hr
          style={{
            color: grey[100],
            width: "100%",
          }}
        />
      </Grid>
    </>
  );
};

export default DayInWeekHeader;
