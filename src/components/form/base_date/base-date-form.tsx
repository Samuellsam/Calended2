import { AppDispatch, RootState } from "@/lib/store";
import { Team } from "@/types/team";
import {
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam } from "@/lib/features/team/team-slice";
import { blue, blueGrey, grey, red } from "@mui/material/colors";
import FormTemplate from "@/components/template/form-template";
import FormRow from "@/components/template/form-row";

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
    <FormTemplate title="Base Date">
      <FormRow label="base date" colored required>
        <DatePicker sx={{ width: "100%" }} />
      </FormRow>
      <FormRow label="team" required>
        <Select color="primary" sx={{ width: "100%" }}>
          {teamOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormRow>
    </FormTemplate>
  );
};

export default BaseDateForm;
