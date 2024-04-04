"use client";

import { Box, TextField } from "@mui/material";
import Calendar from "@/components/calendar/calendar";
import "shepherd.js/dist/css/shepherd.css";
import { ShepherdOptionsWithType, useShepherdTour } from "react-shepherd";
import newSteps from "@/tour/step";
import { useEffect } from "react";

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
  },
  useModalOverlay: true,
};

const HomePage: React.FC<{}> = () => {
  const tour = useShepherdTour({
    tourOptions,
    steps: newSteps,
  });

  useEffect(() => {
    // tour.start();
  }, []);

  return (
    <Box
      sx={{
        paddingBottom: "5px",
      }}
    >
      <Calendar />
    </Box>
  );
};

export default HomePage;
