"use client";

import { useDispatch, useSelector } from "react-redux";
import "./globals.css";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import {
  DEFAULT_THEME,
  THEME_LOCAL_STORAGE_KEY,
  setTheme,
} from "@/lib/features/themes/theme-slice";
import { blueGrey } from "@mui/material/colors";

export default function ThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const theme = useSelector((state: RootState) => state.theme.selectedTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    if (localStorage[THEME_LOCAL_STORAGE_KEY]) {
      dispatch(setTheme(localStorage[THEME_LOCAL_STORAGE_KEY]));
    } else {
      dispatch(setTheme(DEFAULT_THEME.id));
    }

    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}
