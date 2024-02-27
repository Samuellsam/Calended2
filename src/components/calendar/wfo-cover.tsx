import { Team } from "@/types/team";
import axios from "axios";
import { useEffect, useState } from "react";

const WfoCover: React.FC<{
  wfoTeam: Team[];
  wfhTeam: Team;
}> = (props) => {
  const getWfoTeamString = () => {
    let wfoTeamStr = "";

    props.wfoTeam.map((t) => (wfoTeamStr += t.name));

    return wfoTeamStr;
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg transition-bg h-full w-full flex dark-hover"
      style={{
        aspectRatio: "1/1",
        background: props.wfhTeam?.color,
      }}
    >
      <p className="font-caveat text-5xl text-slate-800 m-auto p-1 w-full transition-bg">
        {getWfoTeamString()}
      </p>
    </div>
  );
};

export default WfoCover;
