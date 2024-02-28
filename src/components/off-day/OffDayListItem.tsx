import { Box, Card, CardContent, Tooltip, Typography } from "@mui/material";
import React from "react";
import { OffDay } from "@/types/off-day";

const OffDayListTeam: React.FC<{
  offDay: OffDay;
}> = (props) => {
  return (
    <Card>
      <CardContent>
        <small className="font-bold">
          {`${props.offDay.name} (${props.offDay.type})`}
        </small>
        <br />
        <small>{props.offDay.from?.format("dddd, MMMM Do YYYY")}</small>
        {!props.offDay.from.isSame(props.offDay.to, "date") && (
          <>
            <small>&nbsp;until&nbsp;</small>
            <small>{props.offDay.to?.format("dddd, MMMM Do YYYY")}</small>
          </>
        )}
        <br />
      </CardContent>
    </Card>
  );
};

export default OffDayListTeam;
