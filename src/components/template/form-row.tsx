import { Box, Button, Grid, Typography } from "@mui/material";
import { blue, blueGrey, grey, orange, yellow } from "@mui/material/colors";

const FormRow: React.FC<{
  children: React.ReactNode;
  label: string;
  color: string;
}> = (props) => {
  return (
    <>
      <Grid
        item
        xs={4}
        display={"flex"}
        sx={{
          backgroundColor: props.color === "1" ? yellow[700] : "",
          padding: "5px 10px",
        }}
      >
        <Typography sx={{ marginY: "auto" }} fontSize={"12px"}>
          {props.label.toUpperCase()}
        </Typography>
      </Grid>
      <Grid
        sx={{
          backgroundColor: props.color === "1" ? yellow[700] : "",
          padding: "5px 10px",
        }}
        item
        xs={8}
        display={"flex"}
      >
        {props.children}
      </Grid>
    </>
  );
};

export default FormRow;
