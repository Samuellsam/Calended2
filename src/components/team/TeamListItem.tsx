import { Team } from "@/types/team";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MemberListItem from "../member/MemberListItem";

const TeamListItem: React.FC<{
  team: Team;
}> = (props) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box className="flex">
          <Typography className="my-auto">
            #{props.team.order + 1} Team {props.team.name}
          </Typography>
          <div className="mx-2"></div>
          <Chip
            className="my-auto"
            label={props.team.color}
            style={{ backgroundColor: props.team.color }}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails className="bg-slate-200 p-4">
        {props.team.members.map((m, idx) => (
          <span>
            <MemberListItem member={m} key={m.id} />
            {idx < props.team.members.length - 1 && <span>, </span>}
          </span>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default TeamListItem;
