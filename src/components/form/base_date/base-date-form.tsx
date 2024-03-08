import { AppDispatch, RootState } from "@/lib/store";
import { Team } from "@/types/team";
import { Box, Grid, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam } from "@/lib/features/team/team-slice";
import { blueGrey, grey, red } from "@mui/material/colors";
import FormTemplate from "@/components/template/FormTemplate";

const BaseDateForm: React.FC<{}> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const team = useSelector((state: RootState) => state.team.teams);
  const [teamOptions, setTeamOptions] = useState<Team[]>([]);

  const fetchTeamOptions = async () => {
    dispatch(fetchTeam());
  };

  useEffect(() => {
    setTeamOptions(team);
  }, [team]);

  useEffect(() => {
    fetchTeamOptions();
  }, []);

  return (
    <FormTemplate>
      <Box component="form">
        <Grid
          container
          justifyContent="start"
          alignItems="start"
          columns={1}
          direction={"column"}
          spacing={1}
        >
          <Grid
            item
            sx={{
              width: "100%",
            }}
          >
            <DatePicker sx={{ minWidth: "300px" }} />
          </Grid>
          <Grid
            item
            sx={{
              width: "100%",
            }}
          >
            <Select label="Team" sx={{ minWidth: "300px" }}>
              {teamOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Box>
    </FormTemplate>
  );
};

export default BaseDateForm;
