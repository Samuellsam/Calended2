import { grey } from "@mui/material/colors";

const TodaySign: React.FC<{}> = (props) => {
  return (
    <div
      id="today-sign"
      className="transition-bg"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        borderRadius: "10px",
        display: "flex",
        width: "100%",
        height: "100%",
        transform: "translate(-50%, -50%)",
        border: `3px solid ${grey[100]}`,
        textAlign: "center",
      }}
    >
      <p
        className="font-caveat transition-bg"
        style={{
          color: grey[800],
          backgroundColor: grey[100],
          marginTop: "auto",
          marginBottom: "-1px",
          width: "100%",
          height: "min-content",
        }}
      >
        Today
      </p>
    </div>
  );
};

export default TodaySign;
