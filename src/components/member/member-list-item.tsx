import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Member } from "@/types/member";
import { blue, yellow } from "@mui/material/colors";

const MemberListItem: React.FC<{
  member: Member;
}> = (props) => {
  return (
    <Tooltip
      placement="right"
      title={
        <div>
          <p>{props.member.name}</p>
          <p>{props.member.birthday.format("MMM Do")} 🎁</p>
        </div>
      }
      arrow
    >
      <small style={{ color: yellow[600] }}>{props.member.name}</small>
    </Tooltip>
  );
};

export default MemberListItem;
