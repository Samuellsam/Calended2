import { Box, Button, Grid, Typography } from "@mui/material";
import {
  blue,
  blueGrey,
  grey,
  orange,
  red,
  yellow,
} from "@mui/material/colors";

const FormRow: React.FC<{
  children: React.ReactNode;
  label: string;
  colored?: boolean;
  required?: boolean;
}> = (props) => {
  return (
    <Grid container sx={{ border: `1px solid ${yellow[700]}` }}>
      <Grid
        item
        xs={4}
        display={"flex"}
        sx={{
          backgroundColor: props.colored ? yellow[700] : grey[100],
          padding: "5px 10px",
        }}
      >
        <Typography
          className="form-label"
          sx={{ marginY: "auto", color: props.colored ? grey[900] : "" }}
          fontSize={"12px"}
        >
          {props.label.toUpperCase()}
          {props.required && <span style={{ color: red[700] }}>*</span>}
        </Typography>
      </Grid>
      <Grid
        sx={{
          backgroundColor: props.colored ? yellow[700] : grey[100],
          padding: "5px 10px",
        }}
        item
        xs={8}
        display={"flex"}
      >
        {props.children}
      </Grid>
    </Grid>
  );
};

export default FormRow;
