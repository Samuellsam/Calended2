import { MENU_LISTS } from "@/constants/menu";
import { RootState } from "@/lib/store";
import {
  AppBar,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Slider,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import { TransitionProps } from "@mui/material/transitions";
import BaseDateForm from "../form/base_date/base-date-form";
import { blueGrey, grey, yellow } from "@mui/material/colors";
import { Menu } from "@/types/menu";
import TeamForm from "../form/team/team-form";
import MemberForm from "../form/member/member-form";
import OffDayForm from "../form/off-day/off-day-form";
import TeamAdmin from "../admin/team-admin";
import UploadConfigForm from "../form/config/upload-config-form";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MainMenu: React.FC<{
  open: boolean;
  closeMenu: () => void;
}> = (props) => {
  const theme = useSelector((state: RootState) => state.theme.selectedTheme);
  const lang = useSelector((state: RootState) => state.language.selectedLang);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | undefined>();

  return (
    <Dialog
      open={props.open}
      maxWidth="lg"
      fullScreen
      TransitionComponent={Transition}
    >
      <Box
        sx={{
          color: yellow[700],
          backgroundColor: blueGrey[800],
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: "15px",
            backgroundColor: blueGrey[900],
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenDrawer(true)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className="font-caveat"
            sx={{
              fontWeight: "bold",
              marginX: "10px",
              marginY: "auto",
            }}
          >
            Main Menu
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => props.closeMenu()}
            aria-label="close"
            sx={{
              marginLeft: "auto",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Drawer
          variant="persistent"
          onClose={() => setOpenDrawer(false)}
          anchor="left"
          open={openDrawer}
        >
          <Box
            sx={{
              color: yellow[700],
              display: "flex",
              padding: "15px",
              backgroundColor: blueGrey[900],
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpenDrawer(false)}
              edge="start"
              sx={{
                marginLeft: "auto",
              }}
            >
              <ChevronLeftOutlinedIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              backgroundColor: blueGrey[900],
              height: "100%",
            }}
          >
            {MENU_LISTS.map((m) => (
              <Box
                className="dark-hover"
                key={m.id}
                sx={{
                  aspectRatio: "4/1",
                  width: "200px",
                  color:
                    m.id === selectedMenu?.id ? blueGrey[800] : yellow[700],
                  textAlign: "center",
                  display: "flex",
                  margin: "10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  backgroundColor:
                    m.id === selectedMenu?.id ? yellow[700] : blueGrey[800],
                }}
                onClick={() => {
                  setSelectedMenu(m);
                }}
              >
                <p
                  className="font-caveat"
                  style={{
                    margin: "auto",
                    fontWeight: "bold",
                  }}
                >
                  {m.id === selectedMenu?.id
                    ? `<< ${m.name[lang.id]} >>`
                    : m.name[lang.id]}
                </p>
              </Box>
            ))}
          </Box>
        </Drawer>
        <Box
          sx={{
            height: "100%",
          }}
        >
          {!selectedMenu && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                textAlign: "center",
              }}
            >
              <Typography variant="h1">
                {/* {`(ᗒᗣᗕ)՞`} */}
                🐳
              </Typography>
              <br />
              <Typography variant="h6" className="font-caveat">
                Please select some menu first
              </Typography>
            </Box>
          )}
          {selectedMenu?.name.en == "Team" && <TeamForm />}
          {selectedMenu?.name.en == "Base Date" && <BaseDateForm />}
          {selectedMenu?.name.en == "Member" && <MemberForm />}
          {selectedMenu?.name.en == "Off Day" && <OffDayForm />}
          {selectedMenu?.name.en == "Upload Config" && <UploadConfigForm />}
        </Box>
      </Box>
    </Dialog>
  );
};

export default MainMenu;
