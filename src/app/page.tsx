"use client";

import { Box, Dialog, Fab, Typography } from "@mui/material";
import Calendar from "@/components/calendar/calendar";
import EditIcon from "@mui/icons-material/Edit";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";

const HomePage: React.FC<{}> = () => {
  return (
    <>
      <Box className="pb-1">
        <Calendar />
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        className="fixed bottom-5 right-5 bg-slate-200 text-slate-800"
      >
        <EditIcon />
      </Fab>
    </>
  );
};

export default HomePage;
