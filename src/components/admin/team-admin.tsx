import { Box, Button, IconButton, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SnackBarModel } from "@/types/snackbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchTeam } from "@/lib/features/team/team-slice";
import TeamListItem from "../team/team-list-item";
import AddIcon from "@mui/icons-material/Add";

const TeamAdmin: React.FC<{}> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const team = useSelector((state: RootState) => state.team.teams);

  const [snackbar, setSnackBarModel] = useState<SnackBarModel>({
    isOpen: false,
    message: "",
    autoHide: 5,
  });

  useEffect(() => {
    dispatch(fetchTeam());
  }, []);

  return (
    <>
      <Box padding={"25px"}>
        <Button color="inherit">
          <Typography>Add New</Typography>
          <AddIcon />
        </Button>
        {team.map((t) => (
          <TeamListItem team={t} key={`${t.id}`}></TeamListItem>
        ))}
      </Box>
      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={snackbar.autoHide}
        message={snackbar.message}
      />
    </>
  );
};

export default TeamAdmin;
