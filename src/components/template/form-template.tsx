import { Box, Button, Grid, Typography } from "@mui/material";
import { blueGrey, grey, yellow } from "@mui/material/colors";

const FormTemplate: React.FC<{ children: React.ReactNode; title: string }> = (
  props
) => {
  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: grey[100],
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
          }}
          variant="h5"
        >
          {props.title}
        </Typography>
        <hr style={{ border: `1px solid ${yellow[700]}` }} />
        <Grid container>{props.children}</Grid>
      </Box>
      <Button
        variant="contained"
        sx={{
          marginLeft: "auto",
          marginRight: "10px",
          marginTop: "25px",
          backgroundColor: yellow[700],
          ":hover": {
            backgroundColor: yellow[700],
          },
        }}
      >
        Save
      </Button>
    </Box>
  );
};

export default FormTemplate;
