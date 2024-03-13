import { Box, Button, Grid, Typography } from "@mui/material";
import { blueGrey, grey, yellow } from "@mui/material/colors";

const FormTemplate: React.FC<{ children: React.ReactNode; title: string }> = (
  props
) => {
  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: blueGrey[800],
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        color: "black",
      }}
    >
      <Box component="form">
        <Typography
          sx={{
            fontWeight: "bold",
            color: yellow[700],
            marginBottom: "10px",
          }}
          variant="h4"
          className="font-caveat"
        >
          {props.title}
        </Typography>
        <Grid container>{props.children}</Grid>
      </Box>
      <Button
        variant="contained"
        className="font-caveat"
        sx={{
          marginLeft: "auto",
          marginTop: "10px",
          backgroundColor: yellow[700],
          ":hover": {
            backgroundColor: yellow[700],
          },
          color: "black",
        }}
      >
        Save
      </Button>
    </Box>
  );
};

export default FormTemplate;
