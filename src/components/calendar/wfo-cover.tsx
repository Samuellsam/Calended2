import { Team } from "@/types/team";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";

const WfoCover: React.FC<{
  wfoTeam: Team[];
  wfhTeam: Team;
  mode: "colorful" | "dark";
}> = (props) => {
  const getWfoTeamString = () => {
    let wfoTeamStr = "";

    props.wfoTeam.map((t) => (wfoTeamStr += t.name));

    return wfoTeamStr;
  };

  return (
    <div
      className="transition-bg dark-hover"
      style={{
        aspectRatio: "1/1",
        background: props.mode === "colorful" ? props.wfhTeam?.color : "",
        position: "absolute",
        top: "50%",
        left: "50%",
        borderRadius: "5px",
        display: "flex",
        width: "100%",
        height: "100%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <p
        className="font-caveat transition-bg"
        style={{
          color: props.mode === "colorful" ? grey[800] : grey[100],
          width: "100%",
          padding: "5px",
          margin: "auto",
          fontSize: "3em",
          textAlign: "center",
        }}
      >
        {getWfoTeamString()}
      </p>
    </div>
  );
};

export default WfoCover;
