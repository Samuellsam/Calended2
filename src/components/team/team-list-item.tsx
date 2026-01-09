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
import MemberListItem from "../member/member-list-item";
import { blueGrey, grey } from "@mui/material/colors";

const TeamListItem: React.FC<{
  team: Team;
}> = (props) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: blueGrey[800],
          color: grey[100],
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography sx={{ marginY: "auto" }}>
            #{props.team.order + 1} Team {props.team.name}
          </Typography>
          <div style={{ marginLeft: "10px" }}></div>
          <Chip
            sx={{ marginY: "auto" }}
            label={props.team.color}
            style={{ backgroundColor: props.team.color }}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: blueGrey[600],
          color: grey[100],
          padding: "10px",
        }}
      >
        {props.team.members.map((m, idx) => (
          <div key={idx}>
            <span>
              <MemberListItem member={m} key={m.id} />
            </span>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default TeamListItem;
