import { toggleLang } from "@/lib/features/languages/language-slice";
import { toggleTheme } from "@/lib/features/themes/theme-slice";
import { RootState } from "@/lib/store";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistrationOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import StopOutlinedIcon from "@mui/icons-material/StopOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "@/lib/features/modes/mode-slice";
import { setYear } from "@/lib/features/calendar/calendar-slice";
import MainMenu from "../menu/main-menu";
import { useState } from "react";
import { blueGrey, grey, red, yellow } from "@mui/material/colors";

const Navbar: React.FC<{}> = (props) => {
  const lang = useSelector((state: RootState) => state.language.selectedLang);
  const theme = useSelector((state: RootState) => state.theme.selectedTheme);
  const mode = useSelector((state: RootState) => state.mode.selectedMode);

  const year = useSelector((state: RootState) => state.calendar.year);
  const month = useSelector((state: RootState) => state.calendar.month);

  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] = useState(true);

  const scrollToToday = () => {
    document
      .getElementById("today-sign")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          className="transition-bg"
          sx={{
            backgroundColor: blueGrey[800],
            width: "100%",
          }}
        >
          {/* LOGO */}
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              className="font-rubik-doodle-shadow"
              sx={{
                fontWeight: "bold",
                marginX: "10px",
                color: grey[100],
              }}
            >
              Calended2
              <IconButton
                className="prev-year-control"
                sx={{
                  marginY: "auto",
                  color: grey[100],
                }}
                onClick={() => dispatch(setYear({ year: year - 1 }))}
              >
                <ArrowLeftIcon />
              </IconButton>
              <span
                style={{
                  color: yellow[700],
                }}
              >
                ({year});
              </span>
              <IconButton
                className="next-year-control"
                sx={{
                  marginY: "auto",
                  color: grey[100],
                }}
                onClick={() => dispatch(setYear({ year: year + 1 }))}
              >
                <ArrowRightIcon />
              </IconButton>
            </Typography>
          </Box>

          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              paddingRight: "50px",
            }}
          >
            {/* TODAY */}
            <TodayOutlinedIcon
              className="today-scroll"
              onClick={() => scrollToToday()}
              sx={{
                color: yellow[700],
                cursor: "pointer",
              }}
            />

            <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
              }}
            ></div>

            {/* MODE */}
            {mode.id === "month" ? (
              <StopOutlinedIcon
                className="calendar-mode"
                onClick={() => dispatch(toggleMode())}
                sx={{
                  color: yellow[700],
                  cursor: "pointer",
                }}
              />
            ) : (
              <GridViewOutlinedIcon
                className="calendar-mode"
                onClick={() => dispatch(toggleMode())}
                sx={{
                  color: yellow[700],
                  cursor: "pointer",
                }}
              />
            )}

            <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
              }}
            ></div>

            {/* LANGUAGE */}
            <Typography
              className="language-mode"
              onClick={() => dispatch(toggleLang())}
              sx={{
                color: yellow[700],
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {lang.abbreviation.toUpperCase()}
            </Typography>

            {/* <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
              }}
            ></div> */}

            {/* THEME */}
            {/* {theme.id === "dark" ? (
              <LightModeIcon
                className="theme-calendar"
                onClick={() => dispatch(toggleTheme())}
                sx={{
                  color: yellow[700],
                  cursor: "pointer",
                }}
              />
            ) : (
              <DarkModeIcon
                className="theme-calendar"
                onClick={() => dispatch(toggleTheme())}
                sx={{
                  cursor: "pointer",
                }}
              />
            )} */}

            <div
              style={{
                marginLeft: "5px",
                marginRight: "5px",
              }}
            ></div>

            {/* MAIN MENU */}
            <AppRegistrationIcon
              onClick={() => setOpenMenu(!openMenu)}
              sx={{
                color: yellow[700],
                fontWeight: "bold",
                cursor: "pointer",
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <MainMenu open={openMenu} closeMenu={() => setOpenMenu(false)} />
    </>
  );
};

export default Navbar;
