import { MENU_LISTS } from "@/constants/menu";
import { RootState } from "@/lib/store";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const MainMenu: React.FC<{
  open: boolean;
}> = (props) => {
  const lang = useSelector((state: RootState) => state.language.selectedLang);

  return (
    <Dialog open={props.open} keepMounted>
      <DialogTitle>Main Menu</DialogTitle>
      {MENU_LISTS.map((m) => (
        <DialogContent key={m.id}>
          <DialogContentText>{m.name[lang.id].toUpperCase()}</DialogContentText>
        </DialogContent>
      ))}
    </Dialog>
  );
};

export default MainMenu;
