import { toggleLang } from "@/lib/features/languages/language-slice";
import { toggleTheme } from "@/lib/features/themes/theme-slice";
import { RootState } from "@/lib/store";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import StopOutlinedIcon from "@mui/icons-material/StopOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "@/lib/features/modes/mode-slice";

const Navbar: React.FC<{}> = (props) => {
  const lang = useSelector((state: RootState) => state.language.selectedLang);
  const theme = useSelector((state: RootState) => state.theme.selectedTheme);
  const mode = useSelector((state: RootState) => state.mode.selectedMode);
  const dispatch = useDispatch();

  const scrollToToday = () => {
    document
      .getElementById("today-sign")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppBar position="fixed">
      <Toolbar className="bg-slate-200 dark:bg-slate-800 transition-bg w-full">
        {/* LOGO */}
        <Typography
          variant="h5"
          component="div"
          className="font-bold mx-2 text-slate-800 dark:text-slate-200 font-rubik-doodle-shadow"
        >
          Calended2
          <span className="text-red-700 dark:text-yellow-500 ml-2">
            ({moment().year()});
          </span>
        </Typography>

        <Box className="ml-auto flex items-center">
          {/* TODAY */}
          <TodayOutlinedIcon
            className="text-red-700 dark:text-yellow-500 cursor-pointer"
            onClick={() => scrollToToday()}
          />

          <div className="mx-2"></div>

          {/* MODE */}
          {mode.id === "month" ? (
            <StopOutlinedIcon
              className="text-red-700 dark:text-yellow-500 cursor-pointer"
              onClick={() => dispatch(toggleMode())}
            />
          ) : (
            <GridViewOutlinedIcon
              className="text-red-700 dark:text-yellow-500 cursor-pointer"
              onClick={() => dispatch(toggleMode())}
            />
          )}

          <div className="mx-2"></div>

          {/* LANGUAGE */}
          <Typography
            className="text-red-700 dark:text-yellow-500 font-bold cursor-pointer"
            onClick={() => dispatch(toggleLang())}
          >
            {lang.abbreviation.toUpperCase()}
          </Typography>

          <div className="mx-2"></div>

          {/* THEME */}
          {theme.id === "dark" ? (
            <LightModeIcon
              className="text-yellow-500 cursor-pointer"
              onClick={() => dispatch(toggleTheme())}
            />
          ) : (
            <DarkModeIcon
              className="text-red-700 cursor-pointer"
              onClick={() => dispatch(toggleTheme())}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
