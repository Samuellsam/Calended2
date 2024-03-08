import { Box, Button } from "@mui/material";
import { blueGrey, grey, yellow } from "@mui/material/colors";

const FormTemplate: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: grey[300],
        padding: "25px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {props.children}
      <Button
        variant="contained"
        sx={{
          marginLeft: "auto",
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
