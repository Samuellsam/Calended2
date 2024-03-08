import { Box, Card, CardContent, Tooltip, Typography } from "@mui/material";
import React from "react";
import { OffDay } from "@/types/off-day";
import { blueGrey, grey } from "@mui/material/colors";

const OffDayListItem: React.FC<{
  offDay: OffDay;
}> = (props) => {
  return (
    <Card
      sx={{
        margin: "5px",
        backgroundColor: blueGrey[800],
        color: grey[100],
      }}
    >
      <CardContent>
        <small style={{ fontWeight: "bold" }}>
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

export default OffDayListItem;
