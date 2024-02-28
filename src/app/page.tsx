"use client";

import { Box, Dialog, Typography } from "@mui/material";
import Calendar from "@/components/calendar/calendar";

const HomePage: React.FC<{}> = () => {
  return (
    <Box className="pb-1">
      <Calendar />
    </Box>
  );
};

export default HomePage;
